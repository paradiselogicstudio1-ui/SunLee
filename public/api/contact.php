<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request.']);
    exit;
}

$allowedSources = ['Materials Consultancy', 'Production Consultancy'];
$source = trim((string) ($payload['source'] ?? ''));
$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$company = trim((string) ($payload['company'] ?? ''));
$details = trim((string) ($payload['details'] ?? ''));

if (!in_array($source, $allowedSources, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid source.']);
    exit;
}

if ($name === '' || $email === '' || $details === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name, email, and details are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address.']);
    exit;
}

if (strlen($name) > 150 || strlen($email) > 254 || strlen($company) > 200 || strlen($details) > 10000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'One or more fields are too long.']);
    exit;
}

// Set this to the mailbox that should receive consultation requests.
$recipient = 'info@chianiesoci.it';

if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    error_log('Contact form recipient is not configured in api/contact.php');
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'The contact form is not configured yet.']);
    exit;
}

$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$subject = 'New ' . $source . ' inquiry - ' . $safeName;
$message = implode("\r\n", [
    'Source: ' . $source,
    'Name: ' . $safeName,
    'Email: ' . $safeEmail,
    'Company: ' . ($company !== '' ? $company : '-'),
    '',
    'Message:',
    $details,
]);

$fromAddress = $recipient;
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Fucina Chiani Website <' . $fromAddress . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Sender: ' . $fromAddress,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

if (!mail($recipient, $subject, $message, $headers)) {
    error_log('Contact form mail() call failed');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send email. Please try again later.']);
    exit;
}

echo json_encode(['ok' => true]);
