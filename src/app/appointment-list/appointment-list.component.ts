import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();

  // appintment is property because it'se defined in class
  appointments: Appointment[] = [];

  // Life cycle hook runs before displaying the content or
  ngOnInit() {
    // this.appointments = localStorage
    let savedAppointments = localStorage.getItem('appointments');

    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);
      // console.log(this.appointments)

      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      // If we want to store data locally when the session closes still all the changes we made are saved
      // there then we use `localStorage`. It will save upto 5 MB
      localStorage.setItem('appointments', JSON.stringify(this.appointments));

      // Serialization && Deserialization - convert somehting into JSON & from JSON to js Object

      // alert(this.appointments.length)
      // console.log(this.appointments.length)
    }
  }

  removeAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
