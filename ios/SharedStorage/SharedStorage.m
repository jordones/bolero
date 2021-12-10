//
//  SharedStorage.m
//  bolero
//
//  Created by Jordon on 2021-12-04.
//

#import "SharedStorage.h"
#import "React/RCTLog.h"

@implementation SharedStorage

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(set:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try{
    NSString *suiteName = [NSString stringWithFormat:@"group.bolero.ext"];
    NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:suiteName];
    [shared setObject:data forKey:@"data"];
    [shared synchronize];
    resolve(@"true");
  }@catch(NSException *exception){
    reject(@"get_error",exception.reason, nil);
  }

}

RCT_EXPORT_METHOD(getString:(NSString *)key
                  successCallback:(RCTResponseSenderBlock)successCallback
                  finishCallback:(RCTResponseSenderBlock)finishCallback)
{
  @try{
    NSString *suiteName = [NSString stringWithFormat:@"group.bolero.ext"];
    NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:suiteName];
    [shared synchronize];
    NSString *data = [shared stringForKey:key];
    if (data)
      successCallback(@[data]);
    else
      successCallback(@[@""]);
  }@catch(NSException *exception){
    finishCallback(@[exception.reason]);
  }

}

RCT_EXPORT_METHOD(setString:(NSString *)key
                  value:(NSString *)value
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try{
    NSString *suiteName = [NSString stringWithFormat:@"group.bolero.ext"];
    NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:suiteName];
    [shared setValue:value forKey:key];
    [shared synchronize];
    resolve(@"true");
  }@catch(NSException *exception){
    reject(@"get_error",exception.reason, nil);
  }

}

@end
