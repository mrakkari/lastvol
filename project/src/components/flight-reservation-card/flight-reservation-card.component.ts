import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../services/flight.service';

@Component({
  selector: 'app-flight-reservation-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flight-card">
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-sm font-medium">{{ flight.villeDepart }}</h4>
          <p class="text-xs text-gray-500">{{ formatTime(flight.heureDepart) }}</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-500">{{ formatDuration(flight.tempsTrajet) }}</p>
          <p class="text-sm font-semibold">{{ flight.prix }} €</p>
        </div>
        <div>
          <h4 class="text-sm font-medium">{{ flight.villeArrivee }}</h4>
          <p class="text-xs text-gray-500">{{ formatTime(flight.heureArrivee) }}</p>
        </div>
        <button
          (click)="onReserve()"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Réserver
        </button>
      </div>
    </div>
  `,
  styles: [`
    .flight-card {
      @apply bg-white rounded-lg border border-gray-200 p-4 mb-4;
    }
  `]
})
export class FlightReservationCardComponent {
  @Input() flight!: Flight;
  @Output() reserve = new EventEmitter<void>();

  onReserve() {
    this.reserve.emit();
  }

  formatTime(timeStr: string | undefined): string {
    if (!timeStr) return 'N/A';
    const [hours, minutes] = timeStr.split(':').map(Number);
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}