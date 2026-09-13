# Aruba deployment preparation

This package is prepared for the **Hosting Easy Windows** plan on Aruba. The
website UI is unchanged. IIS serves the Vite build, `web.config` handles React
routes and registers the WebP image type, and PHP handles the existing
`/api/contact` request.

## Contact configuration

Consultation requests are configured for `info@chianiesoci.it` in
`public/api/contact.php`. The same domain mailbox is used as the sender, while
the visitor's address is retained in `Reply-To` for reliable delivery.

## Build and upload

1. Run `npm install` if dependencies are not already installed.
2. Run `npm run build`.
3. Upload the **contents** of `dist`, not the `dist` folder itself, to the Aruba
   website root. The root must contain `index.html`, `web.config`, `assets`,
   `frames`, and `api`.
4. In Aruba File Manager, keep a backup of the existing site before replacing
   its files.
5. Visit `/`, `/materials-consultancy`, and `/production-consultancy` directly
   to verify IIS routing.
6. Submit one consultation request and confirm it reaches the configured inbox.

If the homepage remains on its loading screen, verify that the website root
contains the `frames` directory with all files from `frame_0001.webp` through
`frame_0240.webp`. Aruba File Manager may require the frames archive to be
uploaded and extracted separately.

## Files that are not uploaded

Source folders, Node dependencies, `server`, `.env`, videos used to generate
frames, and project configuration are not required on the host. Only the
production files inside `dist` are uploaded.
