sumaqHotelsApp.controller('bookingCtrl', function ($scope, $timeout, $http, $stateParams, $state, $filter, ngTableParams, habitacionesDataFactory) {
    $scope.msg = "Hola estoy en booking";
    $scope.habitaciones = [
                { "id": "1", "name": "Habitacion 101", "capacity": "2", "status": "Dirty" },
                { "id": "2", "name": "Habitacion 102", "capacity": "2", "status": "Cleanup" },
                { "id": "3", "name": "Habitacion 103", "capacity": "5", "status": "Preparada" },
                { "id": "4", "name": "Habitacion 201", "capacity": "4", "status": "Sucia" },
                { "id": "5", "name": "Habitacion 202", "capacity": "2", "status": "Cleanup" },
                { "id": "6", "name": "Habitacion 203", "capacity": "2", "status": "Ready" }
    ];

    $scope.reservas = [
  {
      "id": "2",
      "text": "Mr. Gray",
      "start": "2015-06-05 00:00:00",
      "end": "2015-06-22 00:00:00",
      "resource": "2",
      "bubbleHtml": "Reservation details: <br\/>Mr. Gray",
      "status": "New",
      "paid": "0"
  },
  { "id": "4", "text": "Mrs. Garc\u00eda", "start": "2015-06-01 00:00:00", "end": "2015-06-05 00:00:00", "resource": "1", "bubbleHtml": "Reservation details: <br\/>Mrs. Garc\u00eda", "status": "Arrived", "paid": "0" },
  { "id": "7", "text": "Mr. Jones", "start": "2015-06-11 00:00:00", "end": "2015-06-20 00:00:00", "resource": "5", "bubbleHtml": "Reservation details: <br\/>Mr. Jones", "status": "CheckedOut", "paid": "100" }
    ];

    $scope.schedulerConfig = {
        scale: "Day",
        days: new DayPilot.Date().daysInMonth(),
        startDate: new DayPilot.Date().firstDayOfMonth(),
        timeHeaders: [
            { groupBy: "Month" },
            { groupBy: "Day", format: "d" }
        ],
        cellWidthSpec: "Auto",
        rowMinHeight : 60,
        treeEnabled: true,
        rowHeaderColumns : [
            { title: "Habitacion", width: 80 },
            { title: "Capacidad", width: 80 },
            { title: "Estado", width: 80 }
        ],
        onBeforeResHeaderRender: function (args) {
            var beds = function (count) {
                return count + " bed" + (count > 1 ? "s" : "");
            };

            args.resource.columns[0].html = beds(args.resource.capacity);
            args.resource.columns[1].html = args.resource.status;
            switch (args.resource.status) {
                case "Dirty":
                    args.resource.cssClass = "status_dirty";
                    break;
                case "Cleanup":
                    args.resource.cssClass = "status_cleanup";
                    break;
            }
        },
        onBeforeCellRender : function(args) {
            var dayOfWeek = args.cell.start.getDayOfWeek();
            if (dayOfWeek === 6 || dayOfWeek === 0) {
                args.cell.backColor = "#f8f8f8";
            }
        },
        onEventMoved: function (args) {
            var params = {
                id: args.e.id(),
                newStart: args.newStart.toString(),
                newEnd: args.newEnd.toString(),
                newResource: args.newResource
            };
            $scope.scheduler.message("Moved.");
            //$http.post("backend_move.php", params).success(function () {
            //    $scope.scheduler.message("Moved.");
            //});
        },
        onTimeRangeSelected: function (args) {
            var dp = $scope.scheduler;

            var modal = new DayPilot.Modal({
                onClosed: function (args) {
                    if (args.result) {  // args.result is empty when modal is closed without submitting
                        loadEvents();
                    }
                    dp.clearSelection();
                }
            });

            modal.showUrl("/Scripts/App/Booking/Partials/nuevaReserva.html?start=" + args.start + "&end=" + args.end + "&resource=" + args.resource);
        },
        onBeforeEventRender : function(args) {
  var start = new DayPilot.Date(args.e.start);
    var end = new DayPilot.Date(args.e.end);
  
    var today = new DayPilot.Date().getDatePart();
  
    args.e.html = args.e.text + " (" + start.toString("M/d/yyyy") + " - " + end.toString("M/d/yyyy") + ")"; 
  
    switch (args.e.status) {
        case "New":
            var in2days = today.addDays(1);
          
            if (start.getTime() < in2days.getTime()) {
                args.e.barColor = 'red';
                args.e.toolTip = 'Expired (not confirmed in time)';
            }
            else {
                args.e.barColor = 'orange';
                args.e.toolTip = 'New';
            }
            break;
        case "Confirmed":
            var arrivalDeadline = today.addHours(18);

            if (start.getTime() < today.getTime() || (start.getTime() === today.getTime() && now.getTime() > arrivalDeadline.getTime())) { // must arrive before 6 pm
                args.e.barColor = "#f41616";  // red
                args.e.toolTip = 'Late arrival';
            }
            else {
                args.e.barColor = "green";
                args.e.toolTip = "Confirmed";
            }
            break;
        case 'Arrived': // arrived
            var checkoutDeadline = today.addHours(10);

            if (end.getTime() < today.getTime() || (end.getTime() === today.getTime() && now.getTime() > checkoutDeadline.getTime())) { // must checkout before 10 am
                args.e.barColor = "#f41616";  // red
                args.e.toolTip = "Late checkout";
            }
            else
            {
                args.e.barColor = "#1691f4";  // blue
                args.e.toolTip = "Arrived";
            }
            break;
        case 'CheckedOut': // checked out
            args.e.barColor = "gray";
            args.e.toolTip = "Checked out";
            break;
        default:
            args.e.toolTip = "Unexpected state";
            break;    
    }
  
    args.e.html = args.e.html + "<br /><span style='color:gray'>" + args.e.toolTip + "</span>";
  
    var paid = args.e.paid;
    var paidColor = "#aaaaaa";

    args.e.areas = [
        { bottom: 10, right: 4, html: "<div style='color:" + paidColor + "; font-size: 8pt;'>Paid: " + paid + "%</div>", v: "Visible"},
        { left: 4, bottom: 8, right: 4, height: 2, html: "<div style='background-color:" + paidColor + "; height: 100%; width:" + paid + "%'></div>", v: "Visible" }
    ];

        },
        contextMenu : new DayPilot.Menu({items: [
  {text:"Edit", onclick: function() { dp.events.edit(this.source); } },
  {text:"Delete", onclick: function() { dp.events.remove(this.source); } },
  {text:"-"},
  {text:"Select", onclick: function() { dp.multiselect.add(this.source); } },
        ]})
        
    };

  

    $timeout(function () {
        loadResources();
        loadEvents($scope.scheduler.visibleStart(), $scope.scheduler.visibleEnd());
    });

    function loadResources() {
        $scope.schedulerConfig.resources = $scope.habitaciones;
    }
     

    function loadEvents(from, to) {
        var params = {
            start: from.toString(),
            end: to.toString()
        };

        $scope.schedulerConfig.startDate = from;
        $scope.schedulerConfig.days = Math.floor(new DayPilot.TimeSpan(to.getTime() - from.getTime()).totalDays());
        $scope.events = $scope.reservas;
    }
});