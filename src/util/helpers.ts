interface Form {
	email: string;
	password?: string;
}

interface Address {
	street: string;
	city: string;
	state: string;
	zip: string;
}

export interface Register extends Form {
	name?: string;
	address?: Address;
}

export interface Login extends Form { }


type K = "email" | "password"
type RegisterKeyType<T extends K> = keyof Pick<Register, T>
type LoginKeyType<T extends K> = keyof Pick<Login, T>

export default function parseToObject(formData: FormData): Login
export default function parseToObject(formData: FormData): Register
export default function parseToObject(formData: FormData, address?: Address): Login | Register {
	const fields = {} as Register | Login;
	const defaultMap: Address = {
		street: '',
		city: '',
		state: '',
		zip: ''
	};
	if (address) {
		(fields as Register)['address'] = address ? address : defaultMap;
	}
	for (let [k, v] of [...formData]) {
		if (!(k in fields)) {
			switch (k) {
				case 'email':
					fields[k as RegisterKeyType<"email">] = '';
				case 'password':
					fields[k as RegisterKeyType<"password">] = '';
			}
		}
		switch (k) {
			case 'email':
				fields[k as RegisterKeyType<'email'>] = String(v);
			case 'password':
				fields[k as RegisterKeyType<"password">] = String(v);
		}
	}
	return fields;
}
