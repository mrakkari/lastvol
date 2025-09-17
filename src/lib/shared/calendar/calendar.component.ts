@@ .. @@
  previousMonth(): void {
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    
    // Calculate new date
    const newViewDate = new Date(currentYear, currentMonth - 1, 1);
    const todayFirstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    
    // Check if we can go to previous month
    if (newViewDate >= todayFirstOfMonth) {
      this.currentViewDate = newViewDate;
      this.generateCalendar();
    }
  }

  nextMonth(): void {
    this.currentViewDate = new Date(currentYear, currentMonth + 1, 1);
    this.generateCalendar();
  }
    // Calculate new date - always allow moving forward
    this.currentViewDate = new Date(currentYear, currentMonth + 1, 1);
    const newViewDate = new Date(currentYear - 1, currentMonth, 1);
    const todayFirstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    
    if (newViewDate >= todayFirstOfMonth) {
      this.currentViewDate = newViewDate;
      this.generateCalendar();
    }
  }

  nextYear(): void {
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    
    // Always allow moving forward in years
    this.currentViewDate = new Date(currentYear + 1, currentMonth, 1);
    this.generateCalendar();
  // Check if previous button should be disabled
    const firstOfCurrentMonth = new Date(year, month, 1);
  // Add method to handle year navigation
  previousYear(): void {
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    
    // Check if we can go to previous year
    const newViewDate = new Date(currentYear - 1, currentMonth, 1);
    const todayFirstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    
    if (newViewDate >= todayFirstOfMonth) {
      this.currentViewDate = newViewDate;
      this.generateCalendar();
    }
  }

  nextYear(): void {
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    
    // Always allow moving forward in years
    this.currentViewDate = new Date(currentYear + 1, currentMonth, 1);
    this.generateCalendar();
  }

  isPreviousYearDisabled(): boolean {
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    const newViewDate = new Date(currentYear - 1, currentMonth, 1);
    const todayFirstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    return newViewDate < todayFirstOfMonth;
  }

    const firstOfThisMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    this.isPreviousDisabled = firstOfCurrentMonth <= firstOfThisMonth;
  }

  isPreviousYearDisabled(): boolean {
    const currentYear = this.currentViewDate.getFullYear();
    const currentMonth = this.currentViewDate.getMonth();
    const newViewDate = new Date(currentYear - 1, currentMonth, 1);
    const todayFirstOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    return newViewDate < todayFirstOfMonth;
  }