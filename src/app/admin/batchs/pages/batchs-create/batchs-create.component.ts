import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BatchService } from 'src/app/core/service/batch.service';
import { UserService } from 'src/app/core/service/user.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';

@Component({
  selector: 'app-batchs-create',  
  templateUrl: './batchs-create.component.html',
  styleUrl: './batchs-create.component.scss'
})
export class BatchsCreateComponent implements OnInit {
  pageTitle: BreadcrumbItem[] = [];
  showPassword: boolean = false;
  users: any[] = [];

  batchData: any = {
    "name-batch": '',
    "total-budget": 0,
    "allocated-budget": 0,
    "is-active": true,
    "is-deleted": false,
    "id-talent": null
  };
  isEditMode: boolean = false;

  @ViewChild('successAlert') successAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;
  constructor(private batchService: BatchService, private userService: UserService ,private router: Router, private route: ActivatedRoute) {}
 
  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.fetchBatchDetails(id);
      }
    });
    
    this.fetchTalentUsers();
    this.pageTitle = [
      { label: 'Master Data', path: '/' },
      { label: 'Bacth', path: '/admin/batchs' },
      { label: this.isEditMode ? 'Edit' : 'Create', path: '', active: true },
    ];
  }
  fetchBatchDetails(id: number) {
    console.log(id);
    
    this.batchService.getBatchById(id).subscribe({
      next: (data) => {
        console.log('Fetched batch data:', data);

        this.batchData = {
          "name-batch": data.nameBatch,
          "total-budget": data.totalBudget,
          "allocated-budget": data.allocatedBudget,
          "is-active": data.active,
          "is-deleted": data.deleted,
          "id-talent": data.respUserTalentDTO.id 
        };

      },
      error: (err) => {
        console.log('a');
        
        console.error('Error fetching batch details:', err);
      }
    });
  }
  fetchTalentUsers() {
    this.userService.getUsersActiveByAccess('Talent').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users with access Talent:', err);
      }
    });
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditMode) {
        this.updateBatch();
      } else {
        this.createBatch();
      }
    } else {
      this.errorAlert.fire();
    }
  }


  createBatch() {
    console.log(this.batchData);
    
    this.batchService.saveBatch(this.batchData).subscribe({
      next: () => {
        this.successAlert.fire();
        this.router.navigate(['/admin/batchs']);
      },
      error: (err) => {
        this.errorAlert.fire();
        console.error('Error creating batch:', err);
      }
    });
  }

  updateBatch() {
    const updatedBatchData = {
      "id" : this.route.snapshot.params['id'],
      "name-batch": this.batchData['name-batch'],
      "total-budget": this.batchData['total-budget'],
      "allocated-budget": this.batchData['allocated-budget'],
      "is-active": this.batchData['is-active'],
      "is-deleted": this.batchData['is-deleted'],
      "id-talent": this.batchData['id-talent'],
    };
  
    console.log('Updated Batch Data:', updatedBatchData);
  
    this.batchService.updateBatch(updatedBatchData).subscribe({
      next: () => {
        this.successAlert.fire();
        this.router.navigate(['/admin/batchs']); 
      },
      error: (err) => {
        this.errorAlert.fire(); // Tampilkan alert error
        console.error('Error updating batch:', err);
      },
    });
  }
  
  
}
