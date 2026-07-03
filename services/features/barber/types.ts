export interface BarberProfile {
  profileImage: string;
  salonName: string;
}
export interface BarberResponse {
  id: string;
  barberProfile: BarberProfile;
  cityName: string;
  provinceName: string;
  fullName: string;
  profileImage: string;
  salonName: string;
}
