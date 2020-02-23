import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-guiapp',
    templateUrl: './guiapp.component.html'
})

export class GUIAppComponent implements OnInit {
    cptForm: FormGroup;
    cid: string;
    cidAutogenerated: boolean;

    appName: string;
    appHomepage: string;

    constructor(private fb: FormBuilder) {
        this.createForm();
        this.cid = 'home.invalid.app';
        this.cidAutogenerated = true;
    }

    ngOnInit()
    {
    };

    createForm() {
        this.cptForm = this.fb.group({
            appName: ['', Validators.required ],
            appSummary: ['', Validators.required ],
            appHomepage: ['', Validators.required ],
            appDescription: ['', Validators.required ],
            cptId: ['', Validators.required ]
        });

        this.cptForm.get('cptId').valueChanges.subscribe(value => {
          this.cidAutogenerated = false;
        });

        this.cptForm.get('appName').valueChanges.subscribe(value => {
          this.appName = value;
          if (this.cidAutogenerated)
            this.guessComponentId();
        });

        this.cptForm.get('appHomepage').valueChanges.subscribe(value => {
          if (value.startsWith('http'))
            this.appHomepage = value;
          else
            this.appHomepage = 'https://' + value;
          if (this.cidAutogenerated)
            this.guessComponentId();
        });
    }

    guessComponentId()
    {
      if (!this.appHomepage)
        return;

      let url;
      try {
        url = new URL(this.appHomepage);
      } catch { return; }

      let rDNSRoot = url.host.split('.').reverse().join('.');
      let tmp = rDNSRoot + '.' + this.appName;
      tmp = tmp.toLowerCase()
               .normalize()
               .replace(/[^\x00-\x7F]/g, '')
               .replace('www', '')
               .replace(' ', '_')
               .replace('-', '_')
               .replace(':', '_');
      this.cid = tmp;
    }

    share() {
        window.alert('You will be notified when the product goes on sale');
    }
}
