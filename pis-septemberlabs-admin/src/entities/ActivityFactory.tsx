import Activity from './Activity';
import MultipleChoice from './MultipleChoice';
import SingleChoice from './SingleChoice';
import Ranking from './Ranking';
import TextAnswer from './TextAnswer';
import OpenCardSorting from './OpenCardSorting';
import ClosedCardSorting from './ClosedCardSorting';

class ActivityFactory {
  static getActivity(activityType: string): Activity {
    let activity;

    switch (activityType) {
    case 'single-choice':
      activity = new SingleChoice();
      break;
    case 'multiple-choice':
      activity = new MultipleChoice();
      break;
    case 'ranking':
      activity = new Ranking();
      break;
    case 'text':
      activity = new TextAnswer();
      break;
    case 'open-card-sorting':
      activity = new OpenCardSorting();
      break;
    case 'closed-card-sorting':
      activity = new ClosedCardSorting();
      break;
    default:
      throw new Error('Unsupported activity type');
    }

    return activity;
  }

  static getActivityByTypeId(idType: number): Activity {
    let activity;

    switch (idType) {
    case 1:
      activity = new MultipleChoice();
      break;
    case 2:
      activity = new SingleChoice();
      break;
    case 3:
      activity = new TextAnswer();
      break;
    case 4:
      activity = new Ranking();
      break;
    case 5:
      activity = new ClosedCardSorting();
      break;
    case 6:
      activity = new OpenCardSorting();
      break;
    default:
      throw new Error('Unsupported activity type');
    }

    return activity;
  }
}

export default ActivityFactory;
