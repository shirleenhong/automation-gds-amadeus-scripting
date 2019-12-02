export class RuleTrigger {
  triggerStateName: string;
  triggerApplicationModeName: string;
  triggerId: number;

  constructor(jsonObj) {
    if (jsonObj) {
      this.triggerStateName = jsonObj.clientDefinedRuleWorkFlowTriggerStateName;
      this.triggerApplicationModeName = jsonObj.clientDefinedRuleWorkflowTriggerApplicationModeName;
      this.triggerId = jsonObj.ClientDefinedRuleWorkflowTriggerId;
    }
  }
}
