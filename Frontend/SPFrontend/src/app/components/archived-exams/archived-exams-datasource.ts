import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {ExamDTO} from "../models/ExamDTO";




/**
 * Data source for the ArchivedExams view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ArchivedExamsDataSource extends DataSource<ExamDTO> {

  paginator: MatPaginator;
  sort: MatSort;


  constructor(public data:ExamDTO[]) {
    super();

  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ExamDTO[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed.
   *
   */
  disconnect() {}

  /**
   * Paginate the data (client-side).
   *
   */
  private getPagedData(data: ExamDTO[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side).
   * .
   */
  private getSortedData(data: ExamDTO[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'exam_id': return compare(+a.exam_id, +b.exam_id, isAsc);
        case 'creation_date': return compare (a.creation_date, b.creation_date, isAsc);
        case 'exam_date': return compare (a.exam_date,b.exam_date, isAsc);
        case 'totalPoints': return compare(+a.totalPoints, +b.totalPoints, isAsc);
        default: return 0;
      }
    });
  }


}


/** Simple sort comparator for client-side sorting. */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


