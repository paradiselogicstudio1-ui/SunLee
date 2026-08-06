import { Fragment, useState } from 'react'

const MAX_TIME = 30

interface Station {
  id: string
  label: string
  time: number
  note: string
}

export default function FactoryEfficiencySimulator() {
  const [numSaws, setNumSaws] = useState(2)
  const [handlingTime, setHandlingTime] = useState(15)
  const [numFabricators, setNumFabricators] = useState(4)

  const stations: Station[] = [
    {
      id: 'storage',
      label: 'Slab Storage',
      time: handlingTime * 0.3,
      note: 'Staging and retrieval of raw slabs.',
    },
    {
      id: 'saws',
      label: 'Bridge Saws',
      time: handlingTime / numSaws,
      note: `${numSaws} saw${numSaws > 1 ? 's' : ''} sharing the cutting load.`,
    },
    {
      id: 'polishing',
      label: 'Edge Polishing',
      time: handlingTime * 0.6,
      note: 'Fixed-capacity finishing line.',
    },
    {
      id: 'finishing',
      label: 'Hand Finishing',
      time: (handlingTime * 0.8) / numFabricators,
      note: `${numFabricators} fabricator${numFabricators > 1 ? 's' : ''} on the floor.`,
    },
  ]

  const maxTime = Math.max(...stations.map((s) => s.time))
  const minTime = Math.min(...stations.map((s) => s.time))
  const isBalanced = maxTime / minTime < 1.3
  const bottleneck = stations.find((s) => s.time === maxTime)!

  function bottleneckMessage() {
    if (isBalanced) {
      return 'Your current configuration is well balanced, no single station is dragging down the line.'
    }
    switch (bottleneck.id) {
      case 'saws':
        return `Bridge saws are your bottleneck at ${bottleneck.time.toFixed(1)} min/slab. Adding another saw would bring this down to ${(handlingTime / (numSaws + 1)).toFixed(1)} min/slab.`
      case 'finishing':
        return `Hand finishing is your bottleneck at ${bottleneck.time.toFixed(1)} min/slab. More fabricators, or a smarter station layout, would relieve the backlog.`
      case 'polishing':
        return `Edge polishing is now your bottleneck at ${bottleneck.time.toFixed(1)} min/slab. This fixed-capacity station can't be sped up by adding saws or fabricators alone, it needs a layout redesign.`
      default:
        return `Slab storage is your bottleneck at ${bottleneck.time.toFixed(1)} min/slab. Retrieval logistics are slowing the whole line down.`
    }
  }

  return (
    <div className="simulator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
          <label className="flex justify-between text-xs uppercase tracking-[0.25em] opacity-60 mb-3">
            <span>Bridge Saws</span>
            <span className="text-[var(--accent)]">{numSaws}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={numSaws}
            onChange={(e) => setNumSaws(Number(e.target.value))}
            className="tech-slider"
          />
        </div>
        <div>
          <label className="flex justify-between text-xs uppercase tracking-[0.25em] opacity-60 mb-3">
            <span>Avg. Slab Handling Time</span>
            <span className="text-[var(--accent)]">{handlingTime} min</span>
          </label>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={handlingTime}
            onChange={(e) => setHandlingTime(Number(e.target.value))}
            className="tech-slider"
          />
        </div>
        <div>
          <label className="flex justify-between text-xs uppercase tracking-[0.25em] opacity-60 mb-3">
            <span>Manual Fabricators</span>
            <span className="text-[var(--accent)]">{numFabricators}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={numFabricators}
            onChange={(e) => setNumFabricators(Number(e.target.value))}
            className="tech-slider"
          />
        </div>
      </div>

      <div className="workflow-track mb-4">
        {stations.map((station, i) => (
          <Fragment key={station.id}>
            <div className={`workflow-station ${station === bottleneck && !isBalanced ? 'bottleneck' : ''}`}>
              <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-1">{station.label}</div>
              <div className="font-display text-2xl">{station.time.toFixed(1)}</div>
              <div className="text-[0.65rem] uppercase tracking-[0.2em] opacity-40 mt-1">min / slab</div>
              <div className="workflow-bar">
                <div className="workflow-bar-fill" style={{ width: `${Math.min(100, (station.time / MAX_TIME) * 100)}%` }} />
              </div>
              <div className="text-xs opacity-50 mt-3">{station.note}</div>
            </div>
            {i < stations.length - 1 && <div className="workflow-arrow">→</div>}
          </Fragment>
        ))}
      </div>

      <div
        className={`mt-10 p-6 border text-center transition-colors ${
          isBalanced ? 'border-[var(--accent)]/40' : 'border-[#c0604a]'
        }`}
      >
        <p className="mb-4 text-sm md:text-base opacity-90">{bottleneckMessage()}</p>
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          Our layout designs eliminate this exact bottleneck. Let's optimize your floor plan.
        </p>
      </div>
    </div>
  )
}
