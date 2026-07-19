import ActionCard from '../cards/action-card';

export default function QuickActionSection() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <ActionCard />

      <ActionCard />

      <ActionCard />

      <ActionCard />
    </div>
  );
}
