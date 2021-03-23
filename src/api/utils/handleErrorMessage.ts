export const handleErrorMessage = (responseApi: any) => {

    if(responseApi && responseApi.error_code && responseApi.error_code.length > 0 ) {
        return responseApi.error_code[0];
    }

    if(responseApi.non_field_errors && responseApi.non_field_errors.length > 0) {
        return responseApi.non_field_errors[0] ;
    }

    if(responseApi.response && responseApi.response.data && responseApi.response.data.non_field_errors) {
        return responseApi.response.data.non_field_errors[0] 
    }

    return "Something went wrong on the checkout, please try again.";
}