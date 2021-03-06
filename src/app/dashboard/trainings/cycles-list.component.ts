import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {CyclePreview} from "../../shared/entities/preview.entities";
import {TrainingsService} from "./services/tranings.service";
import {ServiceInjector} from "../../shared/services/service.injector";
import {TrainingModalsService} from "./services/training-modals.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'coach-cycles-list',
  templateUrl: './cycles-list.component.html',
  styleUrls: ['./trainings.scss', '../../shared/materialize-upgrades.scss']
})
export class CyclesListComponent implements OnInit, AfterViewInit, OnDestroy {

  public isLoading: boolean;
  public finishedCycles: boolean;
  private cyclePreviews: CyclePreview[];
  private trainingsService: TrainingsService;
  private refresh$: Subscription = null;

  constructor(private serviceInjector: ServiceInjector, private trainingModalsService: TrainingModalsService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.trainingsService = serviceInjector.getTrainingsService();
  }

  ngOnInit() {
    this.loadCyclePreviews();
    if (this.refresh$ == null) {
      this.refresh$ = this.trainingModalsService.refreshPage.subscribe(() => this.ngOnInit());
    }
    this.trainingsService.hasUserOnlyFinishedCycles().first()
      .subscribe(
        finished => this.finishedCycles = finished,
        error => console.error(error, 'error')
      );
  }

  ngAfterViewInit(): void {
    setTimeout(1000, () => this.changeDetectorRef.detach());
  }

  ngOnDestroy() {
    this.refresh$.unsubscribe();
    this.refresh$ = null;
  }

  private loadCyclePreviews() {
    this.isLoading = true;
    this.trainingsService.getCyclePreviews()
      .subscribe(
        previews => this.cyclePreviews = previews.slice().reverse(),
        error => console.error(error, 'error'),
        () => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }
      );
  }

  onAddExerciseClick() {
    this.trainingModalsService.callAddExercise(this.finishedCycles);
  }

  onAddCycleClick() {
    this.trainingModalsService.callAddCycle(this.finishedCycles);
  }

  onAddTrainingClick() {
    this.trainingModalsService.callAddTraining(this.finishedCycles);
  }

  public trackByCyclePreviewId(index, cyclePreview: CyclePreview) {
    return cyclePreview.cycleId;
  }
}
