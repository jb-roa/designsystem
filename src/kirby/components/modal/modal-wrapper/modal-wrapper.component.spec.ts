import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { NavParams } from '@ionic/angular';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { FloatingActionButtonComponent } from '../../floating-action-button/floating-action-button.component';
import { IconComponent } from '../../icon/icon.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { IModalController } from '../services/modal.controller.interface';

describe('ModalWrapperComponent', () => {
  let component: ModalWrapperComponent;
  let fixture: ComponentFixture<ModalWrapperComponent>;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('IModalController', [
      'showModal',
      'hideModal',
      'registerModalCloseRef',
    ]);

    const navParamsSpy = jasmine.createSpyObj('NavParams', {
      get: {
        title: 'Test title',
        component: undefined,
        flavor: 'modal',
      },
    });

    TestBed.configureTestingModule({
      declarations: [
        ModalWrapperComponent,
        MockComponent(IconComponent),
        MockComponent(FloatingActionButtonComponent),
      ],
      providers: [
        { provide: IModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
      ],
    }).compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalWrapperComponent, FloatingActionButtonComponent],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it('should render', () => {
      expect(component.config.title).toEqual('Test title');
    });

    it('should be aligned left by default', () => {
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('span');
      expect(title.classList).toContain('text-left');
    });

    it('should be aligned center when drawer flavor is used', () => {
      component.config.flavor = 'drawer';
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('span');
      expect(title.classList).toContain('text-center');
    });
  });

  describe('close button', () => {
    it('should render as a close icon by default', () => {
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('close');
    });

    it("should render arrow-down when flavor is set to 'drawer'", () => {
      component.config.flavor = 'drawer';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('arrow-down');
    });
  });

  describe('supplementary button', () => {
    it('should not render if an icon was provided, but the flavor is modal', () => {
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      fixture.detectChanges();
      var elements = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(elements.length).toBe(1);
      expect(elements[0].componentInstance.name).toBe('close');
    });

    it('should render as the provided icon when flavor is drawer', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      fixture.detectChanges();
      var elements = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(elements.length).toBe(2);
      expect(elements[0].componentInstance.name).toBe('arrow-down');
      expect(elements[1].componentInstance.name).toBe('qr');
    });

    it('should invoke the provided callback on select', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = {
        iconName: 'qr',
        action: (_: any) => {},
      };
      spyOn(component.config.drawerSupplementaryAction, 'action');

      fixture.detectChanges();
      var elements = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(elements.length).toBe(2);
      expect(elements[1].componentInstance.name).toBe('qr');
      elements[1].parent.triggerEventHandler('click', 'test');
      expect(component.config.drawerSupplementaryAction.action).toHaveBeenCalledWith('test');
    });
  });
});
