import Array "mo:base/Array";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor {
  class Father(_id:Nat,_hijo:Principal,_validador:Principal,_sign:Nat,_time:Nat,_saldo:Nat,_stake:Nat) {
    var id =_id;
    var sign=_sign; 
    var validTime=_time; 
    var saldo=_saldo; 
    var staking=_stake;
    var hijo =_hijo;
    var validator= _validador;
    
    public func showID():Nat{
      return id;
    };

    public func showHijo():Principal{
      return hijo;
    };

    public func showValidator():Principal{
      return validator;
    };

    public func showSign():Nat{
      return sign;
    };

    public func plusSign(){
      sign:=sign+1;
    };

    public func showTime():Nat{
      return validTime;
    };

    public func showSaldo():Nat{
      return saldo;
    };

    public func showStake():Nat{
      return staking;
    };
  };

  class Witness(_permit:Bool, _padre: Principal){
    var permit=_permit;
    var padre= _padre;

    public func showPermit():Bool{
      return permit;
    };

    public func showPadre(): Principal{
      return padre;
    };

    public func denied(){
      permit:=false;
    };
  };

  class Heir(_permit:Bool, _padre: Principal){
    var permit=_permit;
    var padre=_padre; 

    public func showPermit():Bool{
      return permit;
    };

    public func showPadre(): Principal{
      return padre;
    };

    public func denied(){
      permit:=false;
    };
  };

  var id: Nat=0;
  var idW: Nat=0;
  var idH: Nat=0;
  var amountPay: Nat=100;
  var percent: Nat=10;
  var size : Nat = 10**5 ;
  var pay = HashMap.HashMap<Principal, Bool>(size, Principal.equal, Principal.hash);
  var poh = HashMap.HashMap<Principal, Bool>(size, Principal.equal, Principal.hash);

  var memberID = HashMap.HashMap<Principal, Nat>(size, Principal.equal, Principal.hash);
  
  var sonID = HashMap.HashMap<Principal, Nat>(size, Principal.equal, Principal.hash);

  var owner : Principal=Principal.fromText("2vxsx-fae");
  var padre : [ var Father ] = Array.init<Father>(size, Father(0,Principal.fromText("jidav-hfaeo-xv7e4-5mglv-j37zr-4m3xc-4kexp-qyd53-fuivn-hliz6-nqe"),Principal.fromText("jidav-hfaeo-xv7e4-5mglv-j37zr-4m3xc-4kexp-qyd53-fuivn-hliz6-nqe"),0,0,0,0));
  var heredero : [ var Heir ] = Array.init<Heir>(size, Heir(false,Principal.fromText("jidav-hfaeo-xv7e4-5mglv-j37zr-4m3xc-4kexp-qyd53-fuivn-hliz6-nqe")));
  var testigo : [ var Witness ] = Array.init<Witness>(size, Witness(false,Principal.fromText("jidav-hfaeo-xv7e4-5mglv-j37zr-4m3xc-4kexp-qyd53-fuivn-hliz6-nqe")));
  
  public shared(msg) func setAmountPay(_amount:Nat) {    
    assert(owner==msg.caller);
    amountPay:=_amount;
  };

  public shared(msg) func getOwner(): async Principal{
    return msg.caller;
  };

  public shared(msg) func setPercent(_percent:Nat) {    
    assert(owner==msg.caller);
    percent:=_percent;
  };

  public shared(msg) func setPay() {    
    assert(pay.get(msg.caller)==null);
    pay.put(msg.caller,true);
  };

  public shared(msg) func setPOH() {    
    assert(poh.get(msg.caller)==null);
    poh.put(msg.caller,true);
  };

  public shared(msg) func newMember(_hijo:Principal,_validador:Principal,_amount: Nat,_time: Nat,_staking: Nat) {    
    assert(poh.get(msg.caller)==?true);
    assert(pay.get(msg.caller)==?true);
    id+=1;
    memberID.put(msg.caller,id);
    padre[id]:=Father(1,_hijo,_validador,0,_time,_amount,_staking);
    idW+=1;
    testigo[idW]:=Witness(true,msg.caller);
    witnessID.put(_validador,idW);
    idH+=1;
    heredero[idH]:=Heir(true,msg.caller);
    sonID.put(_hijo,idW);
  };

  var witnessID = HashMap.HashMap<Principal, Nat>(size, Principal.equal, Principal.hash);
  public shared(msg) func voteValidador() {

    let idw2: Nat = switch(witnessID.get(msg.caller)) {
      case (?found) { found };
      case (null) { 0};
    };
    assert(idw2!=0);
    testigo[idw2].denied();

    let _idp: Nat =switch(memberID.get(testigo[idw2].showPadre())){
      case (?found) { found };
      case (null) { 0};
    };
    padre[_idp].plusSign();
  };

  public shared(msg) func withDrawHeir() { 
    var idh2: Nat = switch(sonID.get(msg.caller)) {
      case (?found) { found };
      case (null) { 0};
    };
    assert(heredero[idh2].showPermit());    
    heredero[idh2].denied();
    var _idp: Nat= switch(memberID.get(heredero[idh2].showPadre())){
      case (?found) { found };
      case (null) { 0};
    };
      
    assert(padre[_idp].showStake()==3);
    //ENVIAR DINERO    
  };

};
