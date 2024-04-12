import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import axios from 'axios';

// Assuming these sources are maintained by different teams
// and the structure of the response is different
// we need to create a service for each source
// to handle the different response structures
// and to handle errors in a consistent way
// and to ensure that the service is testable
@Injectable({ scope: Scope.DEFAULT })
export class FetchSource2Service {
  constructor(@Inject(INQUIRER) private parentClass: object) {}

  async fetch() {
    const source = 'https://coding-challenge.powerus.de/flight/source2';
    try {
      const response = await axios.get(source);
      return response.data;
    } catch (error) {
      console.error(`Error in ${source} request:`, error);
      return {
        flights: [],
      };
    }
  }
}

// export class FetchSource2Service {
//   async fetch() {
//     const source = 'https://coding-challenge.powerus.de/flight/source2';
//     try {
//       const response = await axios.get(source);
//       return response.data;
//     } catch (error) {
//       console.error(`Error in ${source} request:`, error);
//       return {
//         flights: [],
//       };
//     }
//   }
// }
