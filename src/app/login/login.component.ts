import { Component, OnInit,HostListener } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public user: string;
  public pass: string;
  public loading: boolean = false;
  public noUser:boolean=false;
  public noPass:boolean=false;

  public userFormControl = new FormControl('', [
    Validators.required
  ]);
  public passFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private appService: AppService,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() { }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.keyCode === 13) { this.login(); }
  }



  login() {
    if(!this.pass) return this.noPass=true;
    if(!this.user) return this.noUser=true;

    this.loading = true;
    this.appService.accountLogin(this.user, this.pass).then(() => {
      this.loading = false;
      this.router.navigate(['/admin']);
    }).catch(e => {
      this.loading = false;
      alert(e);
    });
  }

}
