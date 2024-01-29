import { GirlGenius } from "./GirlGenius";
import { LeastICouldDo } from "./LeastICouldDo";
import { LookingForGroup } from "./LookingForGroup";
import { GirlsWithSlingshots } from "./GirlsWithSlingshots";
import { SiteHandler } from "./SiteHandler";
import { NuklearPower } from "./NuklearPower";
import { CustomHandler } from "./CustomHandler";
import { XKCD } from "./XKCD";
import { PennyArcade } from "./PennyArcade";
import { MegaTokyo } from "./MegaTokyo";
import { DresdenCodak } from "./DresdenCodak";
import { GunnerkriggCourt } from "./Gunnerkrigg";
import { Lackadaisy } from "./Lackadaisy";
import { Kill6BillionDemons } from "./Kill6BillionDemons";
import { OrderOfTheStick } from "./OrderOfTheStick";
import { MareInternvm } from "./MareInternvm";
import { Unsounded } from "./Unsounded";
import { Wildlife } from "./Wildlife";
import { DumbingOfAge } from "./DumbingOfAge";
import { Paranatural } from "./Paranatural";

const browser = require("webextension-polyfill");

const handlers: Array<(new () => SiteHandler) & { urlStartsWith: string }> = [
  GirlGenius,
  LeastICouldDo,
  LookingForGroup,
  GirlsWithSlingshots,
  NuklearPower,
  XKCD,
  PennyArcade,
  MegaTokyo,
  DresdenCodak,
  GunnerkriggCourt,
  Lackadaisy,
  Kill6BillionDemons,
  OrderOfTheStick,
  MareInternvm,
  Unsounded,
  Wildlife,
  DumbingOfAge,
  Paranatural,
];

const GetCustomHandlers = async (): Promise<SiteHandler[]> => {
  const config = await browser.storage.sync.get();
  return Object.values(config)
    .filter(
      (handler: Record<string, string>) => "nextButtonIdentifier" in handler
    )
    .map(
      (handler: Record<string, string>) =>
        new CustomHandler(
          handler.id,
          handler.name,
          handler.nextButtonIdentifier,
          handler.prevButtonIdentifier
        )
    );
};

export const GetHandlerByUrl = async (
  url: string
): Promise<SiteHandler | undefined> => {
  console.log(GirlGenius.urlStartsWith);

  const foundHandler = handlers.find((handler) => {
    return url.indexOf(handler.urlStartsWith) > -1;
  });

  if (foundHandler) {
    // @ts-ignore
    return new foundHandler();
  }

  const customHandlers = await GetCustomHandlers();
  return customHandlers.find((handler) => {
    return url.indexOf(handler.urlStartsWith) > -1;
  });
};
