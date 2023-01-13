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

export interface Login extends Form {}

type K = 'email' | 'password';
type KeyType<T extends Register | Login, U extends K> = keyof Pick<T, U>;

export default function parseToObject(formData: FormData): Login;
export default function parseToObject(formData: FormData): Register;
export default function parseToObject<T extends Register | Login>(
	formData: FormData,
	address?: Address
): Login | Register {
	const fields = {} as T;
	const defaultMap: Address = {
		street: '',
		city: '',
		state: '',
		zip: ''
	};
	if (address) {
		(fields as T as Register)['address'] = address ? address : defaultMap;
	}
	for (let [k, v] of [...formData]) {
		if (!(k in fields)) {
			switch (k) {
				case 'email':
					fields[k as KeyType<T, 'email'>] = '';
				case 'password':
					fields[k as KeyType<T, 'password'>] = '';
			}
		}
		switch (k) {
			case 'email':
				fields[k as KeyType<T, 'email'>] = String(v);
			case 'password':
				fields[k as KeyType<T, 'password'>] = String(v);
		}
	}
	return fields;
}