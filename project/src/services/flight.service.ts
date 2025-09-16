import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';

export interface Flight {
  id: string;
  villeDepart: string;
  villeArrivee: string;
  dateDepart: string;
  dateArrivee: string;
  prix: number;
  tempsTrajet: number;
  placesReservees?: number;
  placesDisponibles?: number;
  capaciteMaximale?: number;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
  reservations?: any[];
  compagnie?: string;
  heureDepart?: string;
  heureArrivee?: string;
  offres?: string;
  escales?: number;
  bagages?: boolean;
  direct?: boolean;
}

export interface FlightSearchParams {
  dateDepart?: string;
  dateArrivee?: string;
  villeDepart?: string;
  villeArrivee?: string;
  tri?: 'prix' | 'tempsTrajet';
  travellers?: { adults: number; cabinClass: string };
}

export interface FlightSearchResponse {
  flights: Flight[];
  total: number;
}

export interface PriceDateRange {
  date: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  searchFlights(params: FlightSearchParams): Observable<FlightSearchResponse> {
    let httpParams = new HttpParams();
    
    if (params.dateDepart) {
      httpParams = httpParams.set('dateDepart', params.dateDepart);
    }
    if (params.dateArrivee) {
      httpParams = httpParams.set('dateArrivee', params.dateArrivee);
    }
    if (params.villeDepart) {
      httpParams = httpParams.set('villeDepart', params.villeDepart);
    }
    if (params.villeArrivee) {
      httpParams = httpParams.set('villeArrivee', params.villeArrivee);
    }
    if (params.tri) {
      httpParams = httpParams.set('tri', params.tri);
    }

    return this.http.get<Flight[]>(`${this.baseUrl}/vols`, { params: httpParams })
      .pipe(
        map(flights => ({
          flights: this.enrichFlightData(flights),
          total: flights.length
        })),
        catchError(error => {
          console.error('Error fetching flights:', error);
          return of({ flights: [], total: 0 });
        })
      );
  }

  private enrichFlightData(flights: Flight[]): Flight[] {
    return flights.map(flight => ({
      ...flight,
      compagnie: flight.compagnie || ['Air France', 'Ryanair', 'EasyJet'][Math.floor(Math.random() * 3)],
      heureDepart: flight.heureDepart || (flight.dateDepart ? this.formatFlightTime(flight.dateDepart) : undefined),
      heureArrivee: flight.heureArrivee || (flight.dateArrivee ? this.formatFlightTime(flight.dateArrivee) : undefined),
      offres: flight.offres || 'Multiple',
      escales: flight.escales || Math.floor(Math.random() * 3),
      bagages: flight.bagages || (Math.random() > 0.5),
      direct: flight.direct || (Math.random() > 0.3)
    }));
  }

  getFlightsByDateRange(): Observable<PriceDateRange[]> {
    return this.http.get<PriceDateRange[]>(`${this.baseUrl}/vols/price-range`); // Assuming a new endpoint; adjust if needed
  }

  private parseTimeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + (minutes || 0);
  }

  formatFlightTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  formatFlightDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }
}