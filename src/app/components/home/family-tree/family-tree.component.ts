import { Component, OnInit } from '@angular/core';
import FamilyTree from "@balkangraph/familytree.js";

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {

  ngOnInit() {
    const tree = document.getElementById('tree');
    if (tree) {
      const family = new FamilyTree(tree, {
        mode: 'dark',
        toolbar: {
          zoom: true,
          layout: true,
          fit: true,
        },
        nodeBinding: {
          field_0: 'name',
          field_1: 'born',
          img_0: 'photo'
        },
        editForm: {
          titleBinding: "name",
          photoBinding: "photo",
          addMoreBtn: 'Add element',
          addMore: 'Add more elements',
          addMoreFieldName: 'Element name',
          generateElementsFromFields: false,
          elements: [
            { type: 'textbox', label: 'Full Name', binding: 'name' },
            { type: 'textbox', label: 'Email Address', binding: 'email' },
            [
                { type: 'textbox', label: 'Phone', binding: 'phone' },
                { type: 'date', label: 'Date Of Birth', binding: 'born' }
            ],
            [
                { type: 'select', options: [{ value: 'bg', text: 'Bulgaria' }, { value: 'ru', text: 'Russia' }, { value: 'gr', text: 'Greece' }], label: 'Country', binding: 'country' },
                { type: 'textbox', label: 'City', binding: 'city' },
            ],
            { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
          ]
        },
        nodeTreeMenu: true
      });

      family.on('field', function (sender, args) {
        if (args.name == 'born') {
          var date = new Date(args.value);
          args.value = date.toLocaleDateString();
        }
      });

      family.load([
          { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", photo: "https://cdn.balkan.app/shared/2.jpg",  born: '1954-09-29'  },
          { id: 2, pids: [1], name: "Ava Field", gender: "male", photo: "https://cdn.balkan.app/shared/m30/5.jpg",  born: '1954-09-29' },
          { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", photo: "https://cdn.balkan.app/shared/m10/2.jpg",  born: '1954-09-29' },
          { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", photo: "https://cdn.balkan.app/shared/m10/1.jpg",  born: '1954-09-29'  },
          { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", photo: "https://cdn.balkan.app/shared/w10/3.jpg",  born: '1954-09-29' }
      ]);
    }
  }

}
