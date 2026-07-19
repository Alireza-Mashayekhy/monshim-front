import AppointmentFilter from '@/components/dashboard/appointments/appointment-filter';
import AppointmentList from '@/components/dashboard/appointments/appointment-list';
import AppointmentSearch from '@/components/dashboard/appointments/appointment-search';
import AppointmentSummary from '@/components/dashboard/appointments/appointment-summary';

export default function AppointmentsPage() {
  return (
    <div className="page-padding section-gap safe-bottom">
      <AppointmentSummary />

      <AppointmentFilter />

      <AppointmentSearch />

      <AppointmentList />
    </div>
  );
}
