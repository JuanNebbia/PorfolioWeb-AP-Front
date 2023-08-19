import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css']
})
export class ScrollerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = yOffset > 0;
  }

  scrollToTop() {
    window.scrollTo({ top: -100, behavior: 'smooth' });
  }

}
