import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-container">
      <h1>About SkillForge</h1>
      <div class="goal">
        <h2>Project Goal</h2>
        <p>The goal of SkillForge is to provide an interactive platform for skill development and team collaboration.</p>
      </div>
      <div class="team">
        <h2>Team Members</h2>
        <div class="card">
          <h3>Lead Developer</h3>
          <p>John Doe</p>
        </div>
        <div class="card">
          <h3>Frontend Developer</h3>
          <p>Jane Smith</p>
        </div>
        <div class="card">
          <h3>Backend Developer</h3>
          <p>Mike Johnson</p>
        </div>
      </div>
      <div class="technologies">
        <h2>Technologies Used</h2>
        <p>Angular 17, Laravel 10, RxJS, WebSocket, TypeScript</p>
      </div>
    </div>
  `,
  styles: [`
    .about-container { padding: 20px; }
    .card { border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin: 10px 0; }
    h1, h2, h3 { color: #333; }
  `]
})
export class AboutComponent {}
