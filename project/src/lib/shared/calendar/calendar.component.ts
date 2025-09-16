import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <button 
          type="button"
          class="calendar-nav-btn"
          (click)="previousMonth()"
          [disabled]="isPreviousDisabled"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <h2 class="calendar-title">
          {{ currentMonthName }} {{ currentYear }}
        </h2>
        
        <button 
          type="button"
          class="calendar-nav-btn"
          (click)="nextMonth()"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <div class="calendar-grid">
        <div class="calendar-day-header" *ngFor="let day of weekDays">
          {{ day }}
        </div>
        
        <button
          *ngFor="let day of calendarDays; trackBy: trackByDate"
          type="button"
          class="calendar-day"
          [class.today]="day.isToday"
          [class.selected]="day.isSelected"
          [class.other-month]="!day.isCurrentMonth"
          [class.disabled]="day.isDisabled"
          [disabled]="day.isDisabled"
          (click)="selectDate(day.date)"
        >
          {{ day.day }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      @apply bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm;
    }

    .calendar-header {
      @apply flex items-center justify-between mb-4;
    }

    .calendar-nav-btn {
      @apply p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500;
    }

    .calendar-nav-btn:disabled {
      @apply opacity-50 cursor-not-allowed hover:bg-transparent;
    }

    .calendar-nav-btn:hover:not(:disabled) {
      @apply bg-gray-100;
    }

    .calendar-title {
      @apply text-lg font-semibold text-gray-800;
    }

    .calendar-grid {
      @apply grid grid-cols-7 gap-1;
    }

    .calendar-day-header {
      @apply text-xs font-medium text-gray-500 text-center py-2;
    }

    .calendar-day {
      @apply w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500;
    }

    .calendar-day:hover:not(.disabled) {
      @apply bg-blue-100;
    }

    .calendar-day.today {
      @apply bg-blue-100 text-blue-700 font-medium;
    }

    .calendar-day.selected {
      @apply bg-blue-600 text-white font-medium;
    }

    .calendar-day.other-month {
      @apply text-gray-400;
    }

    .calendar-day.disabled {
      @apply text-gray-300 cursor-not-allowed;
    }

    .calendar-day.disabled:hover {
      @apply bg-transparent;
    }
  `]
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() initialDate: Date = new Date('2025-09-16T19:49:00Z');
  @Output() dateSelected = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();
  
  private today = new Date('2025-09-16T19:49:00Z');
  
  // Current view date (for navigation) - this controls which month/year is displayed
  currentViewDate: Date = new Date();
  // Selected date value
  selectedDateValue: Date | null = null;

  weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Calendar display properties
  calendarDays: CalendarDay[] = [];
  currentMonthName: string = '';
  currentYear: number = 0;
  isPreviousDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.initializeDate();
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialDate'] && this.initialDate) {
      this.initializeDate();
      this.generateCalendar();
    }
  }

  trackByDate(index: number, item: CalendarDay): string {
    return item.date.toISOString();
  }

  private initializeDate() {
    const initial = new Date(this.initialDate);
    initial.setHours(0, 0, 0, 0);
    
    if (initial >= this.today) {
      // Set the view to show the month containing the initial date
      this.currentViewDate = new Date(initial.getFullYear(), initial.getMonth(), 1);
      this.selectedDateValue = new Date(initial);
    } else {
      // Set the view to show the current month
      this.currentViewDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
      this.selectedDateValue = new Date(this.today);
    }
  }

  private generateCalendar() {
    const year = this.currentViewDate.getFullYear();
    const month = this.currentViewDate.getMonth();
    
    // Update header information
    this.currentMonthName = this.monthNames[month];
    this.currentYear = year;
    
    // Check if previous button should be disabled
    const firstOfCurrentMonth = new Date(year, month, 1);
    const firstOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.isPreviousDisabled = firstOfCurrentMonth <= firstOfThisMonth;
    
    // Generate calendar days
    this.calendarDays = this.generateCalendarDays(year, month);

    // Force change detection to ensure UI updates
    this.cdr.detectChanges();
  }

  // Remove the generateCalendarForMonth method since we don't need it anymore

  private generateCalendarDays(year: number, month: number): CalendarDay[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({
        date,
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: this.isSameDay(date, this.today),
        isSelected: this.selectedDateValue ? this.isSameDay(date, this.selectedDateValue) : false,
        isDisabled: date < this.today
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, this.today),
        isSelected: this.selectedDateValue ? this.isSameDay(date, this.selectedDateValue) : false,
        isDisabled: date < this.today
      });
    }
    
    // Next month days (to fill the grid)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: this.isSameDay(date, this.today),
        isSelected: this.selectedDateValue ? this.isSameDay(date, this.selectedDateValue) : false,
        isDisabled: false // Future month days are not disabled
      });
    }
    
    return days;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  selectDate(date: Date): void {
    if (date < this.today) return;
    
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    this.selectedDateValue = selectedDate;
    
    // Regenerate calendar to update selection state
    this.generateCalendar();
    
    const formattedDate = this.formatDate(selectedDate);
    this.dateSelected.emit(formattedDate);
  }

  previousMonth(): void {
    console.log('Previous month clicked'); // Debug log
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    
    // Calculate new date
    const newViewDate = new Date(currentYear, currentMonth - 1, 1);
    const todayFirstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    
    // Check if we can go to previous month
    if (newViewDate >= todayFirstOfMonth) {
      this.currentViewDate = newViewDate;
      this.generateCalendar();
      console.log('Moved to:', this.currentMonthName, this.currentYear); // Debug log
    }
  }

  nextMonth(): void {
    console.log('Next month clicked'); // Debug log
    console.log('Current view before:', this.currentViewDate);
    console.log('Current month/year before:', this.currentMonthName, this.currentYear);
    
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    
    // Calculate new date
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    console.log('New date calculated:', newDate);
    
    this.currentViewDate = newDate;
    console.log('Current view after assignment:', this.currentViewDate);
    
    this.generateCalendar();
    console.log('After generateCalendar - Month/Year:', this.currentMonthName, this.currentYear);
    console.log('Calendar days length:', this.calendarDays.length);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cancel(): void {
    this.cancelled.emit();
  }
}