import {TrainingsService} from "./tranings.service";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CyclePreview} from "../../shared/entities/preview.entities";
import {Cycle} from "../../shared/entities/get.entities";
import {ServiceInjector} from "../../shared/services/service.injector";

@Injectable()
export class TrainingsBackEndService extends TrainingsService {

  constructor(private injector: Injector) {
    super(injector.get(ServiceInjector));
  }

  getCyclePreviews(): Observable<CyclePreview[]> {
    console.log("TrainingsBackEndService#getCyclePreviews not implemented yet");
    return null;
  }

  getCycle(cycleId: number): Observable<Cycle> {
    console.log("TrainingsBackEndService#getCycle not implemented yet");
    return null;
  }

  deleteCycle(cycleToDelete: Cycle): void {
    console.log("TrainingsBackEndService#deleteCycle not implemented yet");
  }


  editCycle(cycleToEdit: Cycle): void {
    console.log("TrainingsBackEndService#editCycle not implemented yet");
  }
}