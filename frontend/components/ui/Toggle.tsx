'use client';

interface ToggleProps {
  on: boolean;
  onChange: () => void;
  color?: string;
  offColor?: string;
  disabled?: boolean;
}

/**
 * Professional iOS-style toggle.
 * Track: 44 × 24px  |  Thumb: 20 × 20px  |  2px padding all sides.
 * The thumb is always fully contained inside the track.
 */
export function Toggle({ on, onChange, color = '#2563EB', offColor = '#D1D5DB', disabled = false }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: 44,
        height: 24,
        borderRadius: 12,
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: on ? color : offColor,
        transition: 'background-color 0.22s ease',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        outline: 'none',
      }}
    >
      {/* Thumb */}
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 22 : 2,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          transition: 'left 0.22s ease',
        }}
      />
    </button>
  );
}
