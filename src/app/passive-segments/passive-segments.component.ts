import { Component, ViewChild } from '@angular/core';

import { TabsComponent } from '../shared/tabs/tabs.component';

declare var smartScriptSession: any;

@Component({
  selector: 'app-passive',
  template: `
    <my-tabs>
      <my-tab [tabTitle]="'Segments'">
        <h3>List of Segments</h3>
        <segments-list
          [segments]="segments"
          (addSegment)="onAddSegment()"
          (editSegment)="onEditSegment($event)">
        </segments-list>
        <hr />
        <button class="btn btn-default" (click)="onOpenAbout()"><i class="glyphicon glyphicon-question-sign"></i> About this</button>
      </my-tab>
    </my-tabs>

    <ng-template let-segment="segment" #segmentEdit>
      <segment-edit [segment]="segment" (saveSegment)="onSegmentFormSubmit($event)"></segment-edit>
    </ng-template>
    <ng-template #about>
      <p>
        Hi, I hope this demo was useful to learn more about dynamic components
        in Angular, in specific about <code>ViewContainerRef</code>,
        <code>ComponentResolverFactory</code> etc.
      </p>
      <p>
        Also check out the <a href="https://juristr.com/blog/2017/07/ng2-dynamic-tab-component/">according blog article</a>. You
        may also want to read the <a href="https://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/">article about
        creating basic tabs with <code>@ContentChildren</code> and <code>@QueryList</code></a>.
      </p>
      <p>
        Visit me on <a href="https://twitter.com/juristr">Twitter</a> or on <a href="https://juristr.com/blog">blog</a>.
      </p>
    </ng-template>
  `
})

export class PassiveSegmentsComponent {
  @ViewChild('segmentEdit') editSegmentTemplate;
  @ViewChild('about') aboutTemplate;
  @ViewChild(TabsComponent) tabsComponent;

  segments = [
    {
      id: 1,
      suppliername: 'Juri',
      from: 'Strumpflohner',
      to: '@juristr'
    }
  ];

  onEditSegment(segment) {
    this.tabsComponent.openTab(
      `Editing ${segment.suppliername}`,
      this.editSegmentTemplate,
      segment,
      true
    );
  }

  onAddSegment() {
    this.tabsComponent.openTab('New Segment', this.editSegmentTemplate, {}, true);
  }

  onSegmentFormSubmit(dataModel) {
    if (dataModel.id > 0) {
      this.segments = this.segments.map(segment => {
        if (segment.id === dataModel.id) {
          return dataModel;
        } else {
          return segment;
        }
      });
    } else {
      // create a new one
      dataModel.id = Math.round(Math.random() * 100);
      this.segments.push(dataModel);
    }

    // close the tab
    this.tabsComponent.closeActiveTab();
  }

  onOpenAbout() {
    this.tabsComponent.openTab('About', this.aboutTemplate, {}, true);
  }
}
