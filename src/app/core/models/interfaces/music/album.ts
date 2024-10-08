import { HttpErrorResponse } from "@angular/common/http"

export type AlbumList = {
  album: Album[]
  error?: HttpErrorResponse
}

export type Album = {
  idAlbum?: string
  idArtist: string
  idLabel?: string
  strAlbum: string
  strAlbumStripped: string
  strArtist: string
  strArtistStripped: string
  intYearReleased: string
  strStyle?: string
  strGenre?: string
  strLabel?: string
  strReleaseFormat: string
  intSales: string
  strAlbumThumb?: string
  strAlbumThumbHQ: string
  strAlbumThumbBack?: string
  strAlbumCDart?: string
  strAlbumSpine?: string
  strAlbum3DCase?: string
  strAlbum3DFlat?: string
  strAlbum3DFace?: string
  strAlbum3DThumb?: string
  strDescriptionEN?: string
  strDescriptionDE: string
  strDescriptionFR?: string
  strDescriptionCN: string
  strDescriptionIT: string
  strDescriptionJP: string
  strDescriptionRU: string
  strDescriptionES?: string
  strDescriptionPT: string
  strDescriptionSE: string
  strDescriptionNL: string
  strDescriptionHU: string
  strDescriptionNO: string
  strDescriptionIL: string
  strDescriptionPL: string
  intLoved?: string
  intScore?: string
  intScoreVotes?: string
  strReview?: string
  strMood?: string
  strTheme?: string
  strSpeed?: string
  strLocation: any
  strMusicBrainzID: string
  strMusicBrainzArtistID: string
  strAllMusicID?: string
  strBBCReviewID?: string
  strRateYourMusicID?: string
  strDiscogsID?: string
  strWikidataID?: string
  strWikipediaID?: string
  strGeniusID?: string
  strLyricWikiID: string
  strMusicMozID: string
  strItunesID: string
  strAmazonID: string
  strLocked: string
  strDescription: string
}
