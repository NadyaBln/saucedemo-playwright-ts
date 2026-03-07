export interface CheckoutData {
  firstName: string;
  lastName: string;
  zip: string;
}

export class CheckoutDataBuilder {
  private data = {
    firstName: "",
    lastName: "",
    zip: "",
  };

  withFirstName(firstName: string) {
    this.data.firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this.data.lastName = lastName;
    return this;
  }

  withZip(zip: string) {
    this.data.zip = zip;
    return this;
  }

  build() {
    return this.data;
  }
}
