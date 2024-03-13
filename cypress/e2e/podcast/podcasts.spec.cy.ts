import { HomePageObject } from './pageObjects/homePageObject';
import { PodcastPageObject } from './pageObjects/podcastPageObject';

describe('podcaster', () => {
  const homePage = new HomePageObject();
  const podcastPage = new PodcastPageObject();

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.intercept('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json').as('getPodcasts');
    cy.wait('@getPodcasts').its('response.statusCode').should('eq', 200);
  });

  it('should render all podcasts', () => {
    cy.get(homePage.podcastListSelector).should('have.length', 100);
  });

  it('navigates to podcast details and goes to episode details on click', () => {
    cy.get(homePage.podcastListSelector).first().click();
    cy.contains('The Joe Budden Podcast');
    cy.intercept(
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D1535809341%26media%3Dpodcast%26entity%3DpodcastEpisode'
    ).as('getEpisodes');
    cy.wait(1000).wait('@getEpisodes').its('response.statusCode').should('eq', 200);
    cy.contains('Episodes: 50');
    cy.get(podcastPage.episodeListSelector).first().click();
    cy.contains('Episode 70');
  });
});
