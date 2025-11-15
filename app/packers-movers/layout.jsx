// app/packers-movers/layout.jsx

// ❗ REMOVE metadataBase here (only allowed in root layout)
export const metadata = {
  title: {
    template: '%s | Relax Packers and Movers',
    default: 'Relax Packers and Movers - Packers & Movers Services',
  },
  description:
    'Professional packers and movers services across Odisha with GPS tracking and affordable rates.',
};

export default function PackersMoversLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
