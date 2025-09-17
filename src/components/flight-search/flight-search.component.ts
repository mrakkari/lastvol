@@ .. @@
           <!-- Search Form -->
-          <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
+          <div class="flex flex-col lg:flex-row gap-4 mb-6 items-end">
             <div class="search-input-group">
               <div class="search-input-label">From</div>
               <input
                 type="text"
                 [(ngModel)]="searchParams().villeDepart"
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Country, city or airport"
               />
             </div>

-            <div class="swap-button lg:block hidden">
-              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
-                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
-              </svg>
-            </div>
-
             <div class="search-input-group">
               <div class="search-input-label">To</div>
               <input
                 type="text"
                 [(ngModel)]="searchParams().villeArrivee"
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 placeholder="Country, city or airport"
               />
             </div>

             <div class="search-input-group">
               <div class="search-input-label">Depart</div>
               <button
                 type="button"
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 (click)="openCalendar('depart')"
               >
                 {{ searchParams().dateDepart || 'Depart date' }}
               </button>
             </div>
+            
             <div class="search-input-group">
               <div class="search-input-label">Return</div>
               <button
                 type="button"
                 class="w-full px-4 py-3 border border-gray-300 rounded-lg text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 (click)="openCalendar('return')"
               >
                 {{ searchParams().dateArrivee || 'Add date' }}
               </button>
             </div>

-            <div class="search-input-group">
-              <div class="search-input-label">Travellers and cabin class</div>
-              <button
-                type="button"
-                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
-              >
-                {{ searchParams().travellers?.adults || 1 }} Adult, {{ searchParams().travellers?.cabinClass || 'Economy' }}
-              </button>
-            </div>
+            <!-- Search Button -->
+            <div class="search-input-group">
+              <button
+                type="button"
+                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
+                (click)="searchFlights()"
+                [disabled]="isLoading() || !isSearchValid()"
+              >
+                <span *ngIf="!isLoading()">Search</span>
+                <span *ngIf="isLoading()" class="flex items-center">
+                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
+                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
+                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
+                  </svg>
+                  Searching...
+                </span>
+              </button>
+            </div>
           </div>

           <!-- Additional Options -->
@@ .. @@
           </div>

-          <!-- Search Button -->
-          <div class="flex justify-center mb-8">
-            <button
-              type="button"
-              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-16 py-4 rounded-lg transition-colors duration-200"
-              (click)="searchFlights()"
-              [disabled]="isLoading() || !isSearchValid()"
-            >
-              <span *ngIf="!isLoading()">Search</span>
-              <span *ngIf="isLoading()" class="flex items-center">
-                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
-                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
-                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
-                </svg>
-                Searching...
-              </span>
-            </button>
-          </div>
-
           <!-- Price Tracking Banner -->
@@ .. @@
       <!-- Hero Section -->
       <div class="relative">
-        <div class="h-96 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 flex items-center justify-center">
+        <div class="h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center relative" style="background-image: url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');">
+          <div class="absolute inset-0 bg-black bg-opacity-40"></div>
           <div class="text-center text-white">
             <h2 class="text-3xl font-bold mb-4">Explore every destination</h2>
             <button class="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
               Search flights everywhere
             </button>
           </div>
         </div>
       </div>
@@ .. @@
             <!-- Sort Options Cards -->
             <div class="grid grid-cols-3 gap-4 mb-6">
               <div class="bg-blue-900 text-white p-4 rounded-lg text-center">
                 <div class="text-sm font-medium mb-1">Le meilleur</div>
-                <div class="text-xl font-bold">{{ getLowestPrice() }} €</div>
+                <div class="text-xl font-bold">{{ getHighestPrice() }} €</div>
                 <div class="text-xs opacity-75">{{ formatDuration(getShortestDuration()) }}</div>
               </div>
               <div class="bg-gray-100 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-200">
                 <div class="text-sm font-medium text-gray-600 mb-1">Le moins cher</div>
                 <div class="text-xl font-bold text-gray-900">{{ getLowestPrice() }} €</div>
                 <div class="text-xs text-gray-500">{{ formatDuration(getShortestDuration()) }}</div>
               </div>
               <div class="bg-gray-100 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-200">
                 <div class="text-sm font-medium text-gray-600 mb-1">Le plus rapide</div>
                 <div class="text-xl font-bold text-gray-900">{{ getFastestPrice() }} €</div>
                 <div class="text-xs text-gray-500">{{ formatDuration(getShortestDuration()) }}</div>
               </div>
             </div>
@@ .. @@
   getLowestPrice(): number {
     const flights = this.filteredFlights();
     if (flights.length === 0) return 0;
     return Math.min(...flights.map(f => f.prix));
   }

+  getHighestPrice(): number {
+    const flights = this.filteredFlights();
+    if (flights.length === 0) return 0;
+    return Math.max(...flights.map(f => f.prix));
+  }
+
   getFastestPrice(): number {