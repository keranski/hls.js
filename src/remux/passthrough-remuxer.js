/**
 * passthrough remuxer
*/
import Event from '../events';

class PassThroughRemuxer {
  constructor(observer,id) {
    this.observer = observer;
    this.id = id;
    this.ISGenerated = false;
  }

  get passthrough() {
    return true;
  }

  destroy() {
  }

  insertDiscontinuity() {
  }

  switchLevel() {
    this.ISGenerated = false;
  }

  remux(level,sn,cc,audioTrack,videoTrack,id3Track,textTrack,timeOffset, contiguous,accurateTimeOffset,defaultInitPTS,rawData) {
    var observer = this.observer;
    var streamType = '';
    if (audioTrack) {
      streamType += 'audio';
    }
    if (videoTrack) {
      streamType += 'video';
    }
    observer.trigger(Event.FRAG_PARSING_DATA, {
      id : this.id,
      level : level,
      sn : sn,
      data1: rawData,
      startPTS: timeOffset,
      startDTS: timeOffset,
      type: streamType,
      nb: 1,
      dropped : 0
    });
    //notify end of parsing
    this.observer.trigger(Event.FRAG_PARSED, { id : this.id , level : level, sn : sn});
  }
}

export default PassThroughRemuxer;
