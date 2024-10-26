import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { AuthenticationService } from "src/app/core/service/auth.service";
import { EventService } from "src/app/core/service/event.service";
import {
  LAYOUT_COLOR_DARK,
  LAYOUT_COLOR_LIGHT,
  LEFT_SIDEBAR_TYPE_CONDENSED,
  LEFT_SIDEBAR_TYPE_DEFAULT,
  LEFT_SIDEBAR_TYPE_FULL,
} from "../config/layout.model";
import { BrandItem } from "../models/brands.model";
import { CreateNewMenuOption } from "../models/create-new.model";
import { Language } from "../models/language.model";
import { MegaMenuItem } from "../models/mega-menu.model";
import { NotificationItem } from "../models/notification.model";
import { ProfileOptionItem } from "../models/profileoption.model";
import { SearchResultItem, SearchUserItem } from "../models/search.model";
import { changeBodyAttribute, getLayoutConfig } from "../helper/utils";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
  @Input() layoutType: string = "";
  @Input() leftSidebarTheme: string = "light";
  createMenuOptions: CreateNewMenuOption[] = [];
  megaMenuItems: MegaMenuItem[] = [];
  notificationList: NotificationItem[] = [];
  languages: Language[] = [];
  brands: BrandItem[] = [];
  profileOptions: ProfileOptionItem[] = [];
  selectedLanguage?: Language;
  searchResults: SearchResultItem[] = [];
  searchUsers: SearchUserItem[] = [];

  loggedInUser: any = {};
  topnavCollapsed: boolean = true;
  leftSidebarType: string = "";
  // output events
  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private eventService: EventService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    let config = getLayoutConfig("detached");
    this._fetchMenus();
    this._fetchSearchData();
    this._fetchNotifications();
    this._fetchBrands();
    this._fetchLanguages();
    this._fetchProfileOptions();
    this.leftSidebarType = config.leftSidebarType;

    this.loggedInUser = this.authService.currentUser();

    document.addEventListener("fullscreenchange", this.exitHandler);
    document.addEventListener("webkitfullscreenchange", this.exitHandler);
    document.addEventListener("mozfullscreenchange", this.exitHandler);
    this.onResize();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (document.documentElement.clientWidth <= 1040) {
      this.eventService.broadcast(
        "changeLeftSidebarType",
        LEFT_SIDEBAR_TYPE_FULL
      );
    } else if (document.documentElement.clientWidth > 1040) {
      this.eventService.broadcast(
        "changeLeftSidebarType",
        LEFT_SIDEBAR_TYPE_DEFAULT
      );
    }
  }

  /**
   * fetches menu options
   */
  _fetchMenus(): void {
    this.createMenuOptions = [
      {
        id: 1,
        label: "New Projects",
        icon: "fe-briefcase",
      },
      {
        id: 2,
        label: "Create Users",
        icon: "fe-user",
      },
      {
        id: 3,
        label: "Revenue Report",
        icon: "fe-bar-chart-line-",
      },
      {
        id: 4,
        label: "Settings",
        icon: "fe-settings",
      },
      {
        id: 4,
        label: "Help & Support",
        icon: "fe-headphones",
      },
    ];

    this.megaMenuItems = [
      {
        id: 1,
        menuTitle: "UI Components",
        menuItems: [
          "Widgets",
          "Nestable List",
          "Range Sliders",
          "Masonry Items",
          "Sweet Alerts",
          "Treeview Page",
          "Tour Page",
        ],
      },
      {
        id: 2,
        menuTitle: "Applications",
        menuItems: [
          "eCommerce Pages",
          "CRM Pages",
          "Email",
          "Calendar",
          "Team Contacts",
          "Task Board",
          "Email Templates",
        ],
      },
      {
        id: 3,
        menuTitle: "Extra Pages",
        menuItems: [
          "Left Sidebar with User",
          "Menu Collapsed",
          "Small Left Sidebar",
          "New Header Style",
          "Search Result",
          "Gallery Pages",
          "Maintenance & Coming Soon",
        ],
      },
    ];
  }

  /**
   * Fetches notifications
   */
  _fetchNotifications(): void {
    this.notificationList = [
      {
        text: "Caleb Flakelar commented on Admin",
        isActive: true,
        subText: "1 min ago",
        icon: "mdi mdi-comment-account-outline",
        bgColor: "primary",
        redirectTo: "/dashboard-1",
      },
      {
        text: "New user registered.",
        subText: "5 min ago",
        icon: "mdi mdi-account-plus",
        bgColor: "info",
        redirectTo: "/dashboard-1",
      },
      {
        text: "Cristina Pride",
        subText: "Hi, How are you? What about our next meeting",
        avatar: "assets/images/users/user-4.jpg",
        bgColor: "success",
        redirectTo: "/dashboard-1",
      },
      {
        text: "Caleb Flakelar commented on Admin",
        subText: "2 days ago",
        icon: "mdi mdi-comment-account-outline",
        bgColor: "danger",
        redirectTo: "/dashboard-1",
      },
      {
        text: "Caleb Flakelar commented on Admin",
        subText: "1 min ago",
        icon: "mdi mdi-comment-account-outline",
        bgColor: "primary",
        redirectTo: "/dashboard-1",
      },
      {
        text: "New user registered.",
        subText: "5 min ago",
        icon: "mdi mdi-account-plus",
        bgColor: "info",
        redirectTo: "/dashboard-1",
      },
      {
        text: "Cristina Pride",
        subText: "Hi, How are you? What about our next meeting",
        avatar: "assets/images/users/user-1.jpg",
        bgColor: "success",
        redirectTo: "/dashboard-1",
      },
      {
        text: "Caleb Flakelar commented on Admin",
        subText: "2 days ago",
        icon: "mdi mdi-comment-account-outline",
        bgColor: "danger",
        redirectTo: "/dashboard-1",
      },
    ];
  }

  /**
   * Fetches supported languages
   */
  _fetchLanguages(): void {
    this.languages = [
      {
        id: 1,
        name: "English",
        flag: "assets/images/flags/us.jpg",
      },
      {
        id: 2,
        name: "German",
        flag: "assets/images/flags/germany.jpg",
      },
      {
        id: 3,
        name: "Italian",
        flag: "assets/images/flags/italy.jpg",
      },
      {
        id: 4,
        name: "Spanish",
        flag: "assets/images/flags/spain.jpg",
      },
      {
        id: 5,
        name: "Russian",
        flag: "assets/images/flags/russia.jpg",
      },
    ];
    this.selectedLanguage = this.languages[0];
  }

  /**
   * Fetches brands
   */
  _fetchBrands(): void {
    this.brands = [
      {
        id: 1,
        name: "Slack",
        logo: "assets/images/brands/slack.png",
      },
      {
        id: 2,
        name: "Github",
        logo: "assets/images/brands/github.png",
      },
      {
        id: 3,
        name: "Dribbble",
        logo: "assets/images/brands/dribbble.png",
      },
      {
        id: 4,
        name: "Bitbucket",
        logo: "assets/images/brands/bitbucket.png",
      },
      {
        id: 5,
        name: "Dropbox",
        logo: "assets/images/brands/dropbox.png",
      },
      {
        id: 6,
        name: "G Suite",
        logo: "assets/images/brands/g-suite.png",
      },
    ];
  }

  /**
   * Fetches profile options
   */
  _fetchProfileOptions(): void {
    this.profileOptions = [
      {
        label: "My Account",
        icon: "fe-user",
        redirectTo: "/apps/contacts/profile",
      },
      {
        label: "Settings",
        icon: "fe-settings",
        redirectTo: "[]",
      },
      {
        label: "Lock Screen",
        icon: "fe-lock",
        redirectTo: "/auth/lock-screen",
      },
      {
        label: "Logout",
        icon: "fe-log-out",
        redirectTo: "/auth/logout",
      },
    ];
  }

  /**
   * Fetches search results
   */
  _fetchSearchData(): void {
    this.searchResults = [
      {
        id: 1,
        text: "Analytics Report",
        icon: "fe-home",
      },
      {
        id: 2,
        text: "How can I help you?",
        icon: "fe-aperture",
      },
      {
        id: 3,
        text: "User profile settings",
        icon: "fe-settings",
      },
    ];

    this.searchUsers = [
      {
        id: 1,
        name: "Erwin Brown",
        position: "UI Designer",
        profile: "assets/images/users/user-2.jpg",
      },
      {
        id: 2,
        name: "Jacob Deo",
        position: "Developer",
        profile: "assets/images/users/user-5.jpg",
      },
    ];
  }

  /**
   * changes left sidebar width
   */
  changeSidebarWidth(): void {
    const html = document.documentElement;
    if (
      document.documentElement.hasAttribute("data-sidenav-size") &&
      document.documentElement.getAttribute("data-sidenav-size") === "condensed"
    ) {
      this.eventService.broadcast(
        "changeLeftSidebarType",
        LEFT_SIDEBAR_TYPE_DEFAULT
      );
    } else {
      this.eventService.broadcast(
        "changeLeftSidebarType",
        LEFT_SIDEBAR_TYPE_CONDENSED
      );
    }
    // html.classList.toggle("sidebar-enable");
  }

  changeTheme(): void {
    if (
      document.documentElement.hasAttribute("data-bs-theme") &&
      document.documentElement.getAttribute("data-bs-theme") === "light"
    ) {
      this.eventService.broadcast("changeLayoutColor", LAYOUT_COLOR_DARK);
    } else {
      this.eventService.broadcast("changeLayoutColor", LAYOUT_COLOR_LIGHT);
    }
  }

  /**
   * exit handler for full screen mode
   */
  exitHandler(): void {
    let document: any = window.document;

    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      document.body.classList.remove("fullscreen-enable");
    }
  }

  /**
   * toggles full screen mode
   */
  toggleFullScreen(): void {
    let document: any = window.document;

    document.body.classList.toggle("fullscreen-enable");

    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar(): void {
    this.settingsButtonClicked.emit();
  }
  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    this.topnavCollapsed = !this.topnavCollapsed;
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
    this.showBackdrop()
  }

  private showBackdrop(): void {
    const backdrop = this.renderer.createElement("div");
    this.renderer.setAttribute(backdrop, "id", "custom-backdrop");
    this.renderer.addClass(backdrop, "offcanvas-backdrop");
    this.renderer.addClass(backdrop, "fade");
    this.renderer.addClass(backdrop, "show");
    this.renderer.appendChild(document.body, backdrop);

    if (document.documentElement.getAttribute("dir") !== "rtl") {
      this.renderer.setStyle(document.body, "overflow", "hidden");
      if (window.innerWidth > 1140) {
        this.renderer.setStyle(document.body, "paddingRight", "15px");
      }
    }

    this.renderer.listen(backdrop, "click", () => {
      document.documentElement.classList.remove("sidebar-enable");
      this.hideBackdrop();
    });
  }

  private hideBackdrop(): void {
    const backdrop = document.getElementById("custom-backdrop");
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "paddingRight");
    }
  }
}
