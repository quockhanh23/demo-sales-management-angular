import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Address} from "../models/address";
import {LocationDTO} from "../models/location-dto";

const API_URL = 'http://localhost:8080/api/address'
const EXTERNAL_API_URL = "https://open.oapi.vn/location";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAddressByUser(idUser: any): Observable<Address[]> {
    return this.httpClient.get<Address[]>(API_URL + '/get-all-address-by-user?idUser=' + `${idUser}`)
  }

  getAddressInUse(idUser: any): Observable<Address> {
    return this.httpClient.get<Address>(API_URL + '/get-address-in-use?idUser=' + `${idUser}`)
  }

  createAddress(idUser: any, address: Address): Observable<Address> {
    return this.httpClient.post<Address>(API_URL + `/create-address?idUser=${idUser}`, address)
  }

  selectAddress(idUser: any, idAddress: any): Observable<Address> {
    return this.httpClient.put<Address>(API_URL + `/select-address?idUser=${idUser}&idAddress=${idAddress}`, {})
  }

  deleteAddress(idUser: any, idAddress: any): Observable<Address> {
    return this.httpClient.delete<Address>(API_URL + `/delete-address?idUser=${idUser}&idAddress=${idAddress}`)
  }

  getAllProvince(): Observable<LocationDTO> {
    return this.httpClient.get<LocationDTO>(EXTERNAL_API_URL + `/provinces?page=0&size=1000&query=`);
  }

  getAllDistrictByIdProvince(provinceId: any): Observable<LocationDTO> {
    return this.httpClient.get<LocationDTO>(EXTERNAL_API_URL + `/districts/${provinceId}` + '?page=0&size=1000&query=');
  }

  getAllWardsByIdDistrict(districtId: any): Observable<LocationDTO> {
    return this.httpClient.get<LocationDTO>(EXTERNAL_API_URL + `/wards/${districtId}` + '?page=0&size=1000&query=')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    if (error.status === 500) {
      console.error('Server error (500):', error);
      return throwError(() => new Error('Internal Server Error. Please try again later.'));
    } else if (error.status === 404) {
      console.error('Not Found (404):', error);
      return throwError(() => new Error('Resource not found.'));
    } else {
      console.error('An unexpected error occurred:', error);
      return throwError(() => new Error('Something went wrong; please try again later.'));
    }
  }
}
