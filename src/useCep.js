import { ajax, AjaxResponse } from "rxjs/ajax";
import React from "react";
import {
  map,
  filter,
  switchMap,
  debounceTime,
  retry,
  distinctUntilChanged,
} from "rxjs/operators";

function useCep(subject) {
  return subject.pipe(
    debounceTime(200),
    filter((value) => value.length > 5),
    distinctUntilChanged(),
    map((value) => `http://cep.la/${value}`),
    switchMap((url) => ajax({
      url: url,
      method: 'get',
      headers: {
        "Accept": "application/json"
      },
    })),
    map((data) => data.response.slice(0, 5)),
    retry(3)
  );
}

export default useCep;
