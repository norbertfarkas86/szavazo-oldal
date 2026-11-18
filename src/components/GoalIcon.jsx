export default function GoalIcon({ id }) {
  const shared = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (id) {
    case 'A':
      return <img className="goal-icon-image" src="/projector.png" alt="" aria-hidden="true" />;
    case 'B':
      return <img className="goal-icon-image" src="/assets/futes.png" alt="" aria-hidden="true" />;
    case 'C':
      return <img className="goal-icon-image goal-icon-image--hygene" src="/assets/hygene.png" alt="" aria-hidden="true" />;
    default:
      return <img className="goal-icon-image" src="/assets/gym.png" alt="" aria-hidden="true" />;
  }
}
