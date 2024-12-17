import { getExcerpt, searchBack, searchForward } from '../utils/get-excerpt.mjs';

test('one space back', () => {
  expect(searchBack('abc abc abc', ' ', 10, 1, 100)).toBe(8);
});

test('two spaces back', () => {
  expect(searchBack('abc abc abc', ' ', 10, 2, 100)).toBe(4);
});

test('one space forward', () => {
  expect(searchForward('abc abc abc', ' ', 0, 1, 100)).toBe(4);
});

test('two spaces forward', () => {
  expect(searchForward('abc abc abc', ' ', 0, 2, 100)).toBe(8);
});

const longText = "Still wishing—just want, for the record that you had come to work at Picture the Homeless. \n\nPowell: Yeah, yeah, yeah—sorry, sorry. [Laughs] I didn't mean to deflect that. Yeah. Yeah. Yeah. [Smiles]\n\nLewis: [Laughs] So anyway, in 2010. \n\nPowell: Uh-huh. Uh-Huh. \n\nLewis: We had a meeting. \n\nPowell: Yeah. Yeah.\n\nLewis: At the Ford Foundation, because we had done this initial vacant property count. And again, people were telling us all through the 2000's that, \"This vacant property is not an issue anymore.\" And our folks were like, \"Look! There's vacant buildings everywhere. What do you mean? It's not an issue anymore? It hasn't gone away.\" And even—one time we had a party at my house and Nikita Price and Roosevelt Orphee sat on both sides of Valerio and were like, \"It's an issue. Like, talk to us about how it's not an issue. What do you mean?\"\n\nPowell: Mm-Hmmmm. Mm-Hmmmm. \n\nLewis: [01:12:39] And, we wanted—with Peter Marcuse and Tom Angotti, and John Krinsky, we wanted to launch a kind of citywide initiative around—how do we identify and get sites, for the development of affordable housing for the poorest people in the city, who are homeless or at high risk of being homeless?";

test('long, no match', () => {
  expect(searchForward(longText, '. ', 952, 1, 50)).toBe(953);
});

test('long, spaces', () => {
  expect(searchForward(longText, ' ', 952, 10, 50)).toBe(999);
});
