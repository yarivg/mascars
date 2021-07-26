import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {ColorPresentation} from '../ColorPresentation';
import {Car} from '../car';
import {CarsService} from '../services/cars.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  filteredElements: Car[] = [];
  elements: Car[] = [];
  headElements = [
    'מספר רכב',
    'סוג רכב',
    'צבע',
    'שם'
  ];
  colorPresentation = ColorPresentation;
  searchText = '';
  text: string;
  serial: string;
  carType: string;
  carColor: string;
  name: string;


  constructor(private carsService: CarsService) {
  }

  @HostListener('input') oninput(): void {
    this.searchItems();
  }

  ngOnInit(): void {
    this.carsService.getCars().subscribe(value => {
      this.elements = value;
      this.initNoDashSerials();
      this.searchItems();
    });

    this.mdbTable.setDataSource(this.elements);
  }

  searchItems(): void {
    this.mdbTable.setDataSource(this.elements);

    if (!this.searchText) {
      this.filteredElements = this.mdbTable.getDataSource();
    } else {
      this.filteredElements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText,
        ['name', 'carSerial', 'carType']);
    }
  }


  deleteCar(id: string): void {
    this.carsService.removeCar(id).subscribe();
  }

  addCar(): void {
    const newCar: Car = {
      id: uuidv4(), carType: this.carType, carSerial: this.serial,
      name: this.name, color: this.carColor
    };

    this.initInputs();

    this.carsService.addCar(newCar).subscribe();
  }

  private initInputs(): void {
    this.carType = '';
    this.serial = '';
    this.name = '';
    this.carColor = '';
  }

  private initNoDashSerials(): void {
    this.elements.forEach(elem => {
      elem.carSerialWithNoDashes = elem.carSerial.split('-').join('');
    });
  }
}
