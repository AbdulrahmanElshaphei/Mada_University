import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  lastScrollTop = 0;
  topBarHidden = false;
  scrolled = false; // حالة جديدة علشان لون الناف يتغير

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    // إخفاء الـ Top-bar عند النزول
    if (st > this.lastScrollTop && st > 50) {
      this.topBarHidden = true;
    } else {
      this.topBarHidden = false;
    }

    // تغيير حالة اللون للناف
    this.scrolled = st > 50;

    this.lastScrollTop = st <= 0 ? 0 : st; // للوقاية من الأرقام السالبة
  }
}