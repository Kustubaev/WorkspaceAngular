import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// Описание находится в файле json.service.txt
export class JsonService<T> {
  protected http: HttpClient = inject(HttpClient);

  constructor(@Inject(String) protected apiUrl: string) {}

  public getJson(data?: getInterface) {
    let resultReq = `${this.apiUrl}`;
    const params: string[] = [];

    if (data?.id) {
      resultReq += `/${data?.id}`;
    }

    if (data?.conditions) {
      params.push(
        `${data?.conditions?.name}${
          enumConditions[data?.conditions?.comparison]
        }=${data?.conditions?.value}`
      );
    }

    if (data?.range) {
      params.push(
        `_start=${data?.range?.start}${
          data?.range?.end ? `&_end=${data?.range?.end}` : ''
        }${data?.range?.limit ? `&_limit=${data?.range?.limit}` : ''}`
      );
    }

    if (data?.pagination) {
      const { page, count } = data.pagination;

      if (page >= 1) {
        params.push(
          `_page=${page}${
            count && count > 0 ? `&_per_page=${count}` : '&_per_page=10'
          }`
        );
      } else {
        console.error('В pagination переменная page должна быть больше 0!');
      }
    }

    if (data?.sort) {
      const sortParams = Array.isArray(data.sort)
        ? data.sort
            .map((s) => `${s.order === 'desc' ? '-' : ''}${s.value}`)
            .join(',')
        : `${data.sort.order === 'asc' ? '' : '-'}${data.sort.value}`;
      params.push(`_sort=${sortParams}`);
    }

    if (data?.embed) {
      params.push(`_embed=${data?.embed}`);
    }

    if (params.length) {
      resultReq += `?${params.join('&')}`;
    }

    return this.http.get<T[]>(resultReq);
  }

  public postJson(object: T) {
    return this.http.post(`${this.apiUrl}`, object);
  }

  //Обновляет полностью объект, если такого id нет, то новый не создаст
  public putJson(id: string | number, object: T) {
    return this.http.put(`${this.apiUrl}/${id}`, object);
  }

  //Обновляет частично объект, если такого id нет, то новый не создаст
  public patchJson(id: string | number, object: T) {
    return this.http.patch(`${this.apiUrl}/${id}`, object);
  }

  public deleteJson(id: string | number, dependent?: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}` + (dependent ? `?_dependent=${dependent}` : '')
    );
  }
}

type Range =
  | { start: number; end: number; limit?: never }
  | { start: number; limit: number; end?: never };

interface getInterface {
  id?: string | number;
  embed?: string; //Соединяет таблицы, добавляет в левый объект правый объект как массив объектов. Связь будет только в том случае, если в одном из объектов есть ссылка на другой объект по типу "leftId".
  conditions?: {
    name: string; //Для вложенных условий => 'a.b.c', для массивов => 'a[0].b'!
    comparison: '==' | '<' | '<=' | '>' | '>=' | '!=';
    value: number | string;
  } | null;
  range?: Range | null;
  pagination?: {
    page: number;
    count?: number;
  } | null;
  sort?:
    | { value: string; order?: 'asc' | 'desc' }
    | { value: string; order?: 'asc' | 'desc' }[]
    | null;
}

const enumConditions: { [key: string]: string } = {
  '==': '',
  '<': '_lt',
  '<=': '_lte',
  '>': '_gt',
  '>=': '_gte',
  '!=': '_ne',
};
