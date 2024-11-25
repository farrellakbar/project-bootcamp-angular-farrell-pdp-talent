import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GroupService } from 'src/app/core/service/group.service';
import { ProgramService } from 'src/app/core/service/program.service';
import { ScheduleService } from 'src/app/core/service/schedule.service';
import { UnitService } from 'src/app/core/service/unit.service';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class ScheduleEventComponent implements OnInit {

  modelTitle: string = "";
  event: any = { dateStart: '', duration: 1, groupId: null, programId: null, unitId: null };
  groups: any[] = [];
  programs: any[] = [];
  units: any[] = [];

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventUpdated: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();
  @ViewChild('successSaveAlert') successSaveAlert!: SwalComponent;
  @ViewChild('errorSaveAlert') errorSaveAlert!: SwalComponent;
  @ViewChild('successUpdatedAlert') successUpdatedAlert!: SwalComponent;
  @ViewChild('errorUpdatedAlert') errorUpdatedAlert!: SwalComponent;
  @ViewChild('confirmDeleteSwal') confirmDeleteSwal!: SwalComponent;
  @ViewChild('successDeleteAlert') successDeleteAlert!: SwalComponent;
  @ViewChild('errorDeleteAlert') errorDeleteAlert!: SwalComponent;

  @ViewChild('content', { static: true }) content: any;
  constructor(
                public activeModal: NgbModal, 
                private scheduleService: ScheduleService,
                private unitService: UnitService,
                private groupService: GroupService,
                private programService: ProgramService
              ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.unitService.getUnitsActive().subscribe(data => this.units = data);
    this.groupService.getGroupsActive().subscribe(data => this.groups = data);
    this.programService.getProgramsActive().subscribe(data => this.programs = data);
  }

  confirmDeleteEvent(): void {
    this.confirmDeleteSwal.fire();
  }

  /**
   * opens modal
   * @param title title of modal 
   * @param data data to be used in modal
   */
  openModal(title: string, data: any): void {
    console.log(title, data);
    this.modelTitle = title;
    this.event = { 
      id: data.id || null,
      dateStart: data.start || '', 
      duration: data.duration || 1,
      groupId: data.groupId || null,
      programId: data.programId || null,
      unitId: data.unitId || null,
      done: data.done || null  

    };
    this.activeModal.open(this.content, { backdrop: "static" });
  }

  /**
   * stores event in calendar events
   */
  saveEvent() {
    console.log(this.event.id);
    
    const endDate = this.calculateEndDate(this.event.dateStart, this.event.duration);
    const scheduleData = {
      "date-start": this.event.dateStart,
      "date-end": endDate,
      "duration": this.event.duration,
      "is-active": true,
      "is-deleted": false,
      "id-group": this.event.groupId,
      "id-program": this.event.programId,
      "id-unit": this.event.unitId
    };
    if (this.event.id != null) {
      console.log("ini update");
      console.log(scheduleData);
      
      this.scheduleService.updateSchedule(this.event.id, scheduleData).subscribe({
        next: () => {
          this.successUpdatedAlert.fire();
          this.eventUpdated.emit();
          this.activeModal.dismissAll();
        },
        error: (err) => {
          console.error("Error update schedule:", err);
          this.errorUpdatedAlert.fire();
        }
      });
    }else{
      console.log("ini simpan");
      
      this.scheduleService.saveSchedule(scheduleData).subscribe({
        next: () => {
          this.successSaveAlert.fire();
          this.eventSaved.emit();
          this.activeModal.dismissAll(); 
        },
        error: (err) => {
          console.error("Error saving schedule:", err);
          this.errorSaveAlert.fire();
        }
      });
    }
  }

  /**
   * calculates end date based on start date and duration
   */
  calculateEndDate(startDate: string, duration: number): string {
    if (!startDate || isNaN(new Date(startDate).getTime())) {
      console.error("Invalid startDate:", startDate);
      throw new Error("Invalid startDate. Please provide a valid date.");
    }
  
    const start = new Date(startDate);
    start.setDate(start.getDate() + duration);
    return start.toISOString().split('T')[0];
  }
  

  /**
   * deletes event from calendar events
   */
  deleteEvent(): void {
    if (!this.event.id) return;

    this.scheduleService.deleteSchedule(this.event.id).subscribe({
      next: () => {
        this.eventDeleted.emit(this.event.id);
        this.successDeleteAlert.fire();
        this.activeModal.dismissAll();
      },
      error: () => {
        this.errorDeleteAlert.fire();
      }
    });
  }

}
