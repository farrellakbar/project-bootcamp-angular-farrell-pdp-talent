import { Component, OnInit, ViewChild } from '@angular/core';

import {
  FullCalendarModule,
  FullCalendarComponent,
} from "@fullcalendar/angular";
import {
  CalendarOptions,
  DateInput,
  EventClickArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  Draggable,
} from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { BreadcrumbItem } from "src/app/shared/page-title/page-title.model";
import { ScheduleEventComponent } from '../../event/event.component';
import { CALENDAREVENTS } from "../../shared/data";
import { ExternalEvent } from "../../shared/event.model";
import { ScheduleService } from 'src/app/core/service/schedule.service';
@Component({
  selector: 'app-schedules-index',
  templateUrl: './schedules-index.component.html',
  styleUrl: './schedules-index.component.scss'
})
export class SchedulesIndexComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  calendarOptions: CalendarOptions = {};
  calendarEventsData: EventInput[] = [];
  selectedDay: any = {};
  isEditable: boolean = false;
  event: EventInput = {};
  externalEvents: ExternalEvent[] = [];
  //reference to full calender element
  @ViewChild("calendar")
  calendarComponent!: FullCalendarComponent;

  @ViewChild("eventModal", { static: true })
  eventModal!: ScheduleEventComponent;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.pageTitle = [
      { label: "Schedule", path: "/", active: true },
    ];
    this._fetchData();
    this.initCalendar();
  }

  ngAfterViewInit(): void {
    new Draggable(document.getElementById("external-events")!, {
      itemSelector: ".external-event",
    });
  }

  /**
   * initialize calendar config
   */
  initCalendar(): void {
    // full calendar config
    this.calendarOptions = {
      plugins: [
        dayGridPlugin,
        listPlugin,
        interactionPlugin,
        bootstrapPlugin,
      ],
      themeSystem: "bootstrap",
      // bootstrapFontAwesome: false,
      buttonText: {
        today: "Today",
        month: "Month",
        prev: "Prev",
        next: "Next",
      },
      initialView: "dayGridMonth",
      // handleWindowResize: true,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth",
      },
      events: this.calendarEventsData,
      editable: false,
      droppable: false,
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };
  }

  /**
   * fetches events
   */
  _fetchData(): void {
    this.scheduleService.getSchedulesActive().subscribe(
      (data) => {
        this.calendarEventsData = data.map((item: any) => ({
          id: item.id,
          title: item.respProgramDTO?.nameProgram || 'No Program',
          start: item.dateStart,
          end: item.dateEnd,
          classNames: item.respUnitDTO ? 'bg-info' : 'bg-success',
          extendedProps: {
            duration: item.duration,
            groupId: item.respGroupDTO?.id,
            programId: item.respProgramDTO?.id,
            unitId: item.respUnitDTO?.id,
            done: item.done
          }
        }));
        this.calendarOptions.events = [...this.calendarEventsData];
      },
      (error) => {
        console.error('Error loading schedules:', error);
      }
    );
  }

  /**
   * Opens event modal
   * @param title title of modal
   * @param data data to be used in modal
   */
  openEventModal(title: string = "", data: any = {}): void {
    this.eventModal.openModal(title, data);
  }

  /**
   * Creates new event for today
   */
  createNewEvent(): void {
    const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
    this.event = {
      id: "",
      start: formattedDate,
      extendedProps: {
        duration: 1,
        groupId: 0,
        programId: 0,
        unitId: 0,
        done: false,
      }
    };
    this.isEditable = false;
    this.openEventModal("Add New Schedule", this.event);
  }

  /**
   * Handling date click on calendar
   * @param arg DateClickArg
   */
  handleDateClick(arg: DateClickArg): void {
    this.selectedDay = arg;
    const selectedDate = new Date(this.selectedDay.date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    this.event = {
      id: "",
      title: "",
      classNames: "",
      category: "bg-danger",
      start: formattedDate,
    };
    this.isEditable = false;
    this.openEventModal("Add New Schedule", this.event);
  }

  /**
   * Handling click on event on calendar
   * @param arg EventClickArg
   */
  handleEventClick(arg: EventClickArg): void {
    const event = arg.event;
    // console.log(event.extendedProp);
    
    this.event = {
      id: event.id,
      start: event.startStr,
      duration: event.extendedProps.duration,
      groupId: event.extendedProps.groupId,
      programId: event.extendedProps.programId,
      unitId: event.extendedProps.unitId,
      done: event.extendedProps.done
    };
    console.log('ini after event', this.event);
    
    this.isEditable = true;
    this.openEventModal("Edit Schedule", this.event);
  }

  /**
   * Handle the event save
   * @param newEvent new event
   */
  handleEventSave(): void {
    this._fetchData();
  }

  handleEventUpdate(): void {
    this._fetchData();
  }
  /**
   * Deletes calendar event
   * @param deleteEvent event to be deleted
   */
  handleEventDelete(): void {
    this._fetchData();
  }
}
