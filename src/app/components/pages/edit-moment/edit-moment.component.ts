import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moment';

import { MomentService } from 'src/app/services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MesagesService } from 'src/app/services/mesages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {
  moment!: Moment
  btnText: string = 'Editar'

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MesagesService,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    })
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id

    const formData = new FormData()

    formData.append('title', momentData.title)
    formData.append('title', momentData.description)

    if(momentData.image) {
      formData.append('image', momentData.image)
    }

    await this.momentService.updateMomnet(id!, formData).subscribe()

    this.messageService.add(`momnet ${id} foi atualizado com sucesso!`)

    this.router.navigate(['/'])
  }

}
