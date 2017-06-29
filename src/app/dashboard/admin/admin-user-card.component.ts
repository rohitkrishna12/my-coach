import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../shared/entities/get.entities";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'coach-admin-user-card',
  template: `
    <div class="admin-user-card" *ngIf="user && user?.userId !== userService.getLoggedInUser()?.userId">
      <img class="responsive-img circle" src="{{imgSrc}}"/>
      <p class="username">{{user.name}}</p>
      <form>
        <p>
          <input type="checkbox" class="filled-in"
                 id="admin_{{user.userId}}" name="admin_{{user.userId}}" [ngModel]="isAdmin"
                 (ngModelChange)="toggleAdminStatus()"/>
          <label for="admin_{{user.userId}}">Admin</label>
        </p>
        <p>
          <input type="checkbox" class="filled-in"
                 id="active_{{user.userId}}" name="active_{{user.userId}}" [ngModel]="isActive"
                 (ngModelChange)="toggleActiveStatus()"/>
          <label for="active_{{user.userId}}">Active</label>
        </p>
      </form>
    </div>
  `,
  styleUrls: ['./admin.scss']
})
export class AdminUserCardComponent implements OnInit {
  @Input() user: User;
  public imgSrc = "";
  public isAdmin = false;
  public isActive = true;

  constructor(public userService: UserService) {
  }


  ngOnInit(): void {
    this.imgSrc = this.userService.getUserImgLink(this.user.fbId, "small");
  }

  public toggleAdminStatus() {
    this.isAdmin = !this.isAdmin;
    console.log("Changed admin to: ", this.isAdmin);
  }


  public toggleActiveStatus() {
    this.isActive = !this.isActive;
    console.log("Changed active to: ", this.isActive);
  }
}
