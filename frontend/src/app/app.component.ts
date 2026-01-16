import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container header-content">
          <div class="logo">
            <span class="material-icons">school</span>
            <h1>SkillForge</h1>
          </div>
          <nav class="nav-menu">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/courses" routerLinkActive="active">Courses</a>
            <a routerLink="/students" routerLinkActive="active">Students</a>
            <a routerLink="/instructors" routerLinkActive="active">Instructors</a>
            <a routerLink="/contact" routerLinkActive="active">Contact</a>
            <a routerLink="/about" routerLinkActive="active">About</a>
          </nav>
        </div>
      </header>
      
      <main class="app-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
      
      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2026 SkillForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .app-header {
      background: var(--color-secondary);
      color: white;
      padding: 16px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logo h1 {
      margin: 0;
      font-size: 24px;
    }
    
    .logo .material-icons {
      font-size: 32px;
    }
    
    .nav-menu {
      display: flex;
      gap: 24px;
    }
    
    .nav-menu a {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: var(--border-radius);
      transition: background 0.2s;
    }
    
    .nav-menu a:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .nav-menu a.active {
      background: var(--color-primary);
    }
    
    .app-main {
      flex: 1;
      padding: 32px 0;
    }
    
    .app-footer {
      background: var(--color-secondary);
      color: white;
      padding: 24px 0;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 16px;
      }
      
      .nav-menu {
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
      }
    }
  `]
})
export class AppComponent {
  title = 'SkillForge';
}