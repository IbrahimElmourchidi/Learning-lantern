import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * this component is just a wrapper around either login or signup component
 * this wrapper is used for styling and redirecting to login.
 */
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent implements OnInit {
  /**
   *
   * the constructor inject Router to the component for redirection
   *
   * @param router
   */
  constructor(private router: Router) {}
  /**
   * if the user enter the /en/auth route redirect to /en/auth/login
   */
  ngOnInit(): void {
    let currentRoute = this.router.url;
    if (currentRoute == '/en/auth') this.router.navigate(['/en/auth/login']);
  }
}
