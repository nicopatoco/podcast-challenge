export interface PodcastsFeed {
  author: Author;
  entry: PodcastEntry[];
  updated: LabelValue;
  rights: LabelValue;
  title: LabelValue;
  icon: LabelValue;
  link: LinkAttribute[];
  id: LabelValue;
}

interface Author {
  name: LabelValue;
  uri: LabelValue;
}

export interface PodcastEntry {
  'im:name': LabelValue;
  'im:image': Image[];
  summary: LabelValue;
  'im:price': Price;
  'im:contentType': ContentType;
  rights: LabelValue;
  title: LabelValue;
  link: LinkAttributeSingle;
  id: ID;
  'im:artist': Artist;
  category: Category;
  'im:releaseDate': ReleaseDate;
}

interface LabelValue {
  label: string;
}

interface Image {
  label: string;
  attributes: Height;
}

interface Height {
  height: string;
}

interface Price {
  label: string;
  attributes: Amount;
}

interface Amount {
  amount: string;
  currency: string;
}

interface ContentType {
  attributes: TermLabel;
}

interface TermLabel {
  term: string;
  label: string;
}

interface LinkAttribute {
  attributes: LinkDetail;
}

interface LinkAttributeSingle {
  attributes: LinkDetailSingle;
}

interface LinkDetail {
  rel: string;
  type: string;
  href: string;
}

interface LinkDetailSingle {
  rel: string;
  type: string;
  href: string;
}

interface ID {
  label: string;
  attributes: ImId;
}

interface ImId {
  'im:id': string;
}

interface Artist {
  label: string;
  attributes?: ArtistHref;
}

interface ArtistHref {
  href: string;
}

interface Category {
  attributes: CategoryAttributes;
}

interface CategoryAttributes {
  'im:id': string;
  term: string;
  scheme: string;
  label: string;
}

interface ReleaseDate {
  label: string;
  attributes: ReleaseDateLabel;
}

interface ReleaseDateLabel {
  label: string;
}
