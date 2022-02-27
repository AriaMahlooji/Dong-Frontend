import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import * as EmailValidator from 'email-validator';
import * as Color from 'color'
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userDetails;

  isFormValid:boolean;

  wantToEdit:boolean = false;

  newGmail:string;
  isNewGmailValid:boolean;

  submitButtonIsPressed:boolean;

  currentPassWord:string;
  isCurrentPassWordCorrect:boolean;
  currentPasswordDirtyState:boolean;

  isSimilarToOldPassword:boolean;
  newPassWord:string;
  newPasswordLenghtState:boolean;
  newPasswordComplexityState:boolean;
  newPasswordHasDigit:boolean;
  newPasswordHasUpperCase:boolean;
  newPasswordHasLowerCase:boolean;
  newPasswordHasSpescialCharacter:boolean;
  isNewPasswordOk:boolean;
  newPasswordDirtyState:boolean;

  newPhoneNumber:string;
  isPhonenumberOk:boolean;
  phonenumberDirtyState:boolean;

  gmailDirtyState:boolean;
  constructor(public userProfileService:UserService, public toastr:ToastrService,public http:HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      (res:any)=>
      {
        this.userDetails = res;
      }
    );

    this.submitButtonIsPressed = false;

    this.wantToEdit =false;
    this.toastr.toastrConfig.enableHtml = true;
    this.isNewGmailValid =true;
    this.gmailDirtyState = false;

    this.isCurrentPassWordCorrect = false;
    this.currentPasswordDirtyState = false;


    this.newPasswordComplexityState = false;
    this.newPasswordLenghtState = false;
    this.newPasswordHasDigit = false;
    this.newPasswordHasUpperCase = false;
    this.newPasswordHasLowerCase = false;
    this.newPasswordHasSpescialCharacter = false;
    this.newPasswordDirtyState = false;
    this.isNewPasswordOk =false;

    this.isPhonenumberOk = true;
    this.phonenumberDirtyState = false;


  }

  activateEditMode()
  {
    this.wantToEdit =true;
  }
  disableEditMode()
  {
    this.submitButtonIsPressed = false;
    this.wantToEdit = false;

    this.gmailDirtyState = false;
    this.isNewGmailValid = true;

    this.newPasswordDirtyState = false;
    this.currentPasswordDirtyState = false;

    this.isPhonenumberOk = true;
    this.phonenumberDirtyState = false;

  }


  bindGmail(e:Event)
  {

    this.newGmail =(e.target as HTMLInputElement).value;
    //this.toastr.info("Gmail: "+this.newGmail);
    this.validateGmail();
    this.gmailDirtyStateCheck();

  }
  gmailDirtyStateCheck()
  {
    if(this.newGmail.length>0)
    {
      this.gmailDirtyState = true;
    }
    else
    {
      this.gmailDirtyState = false;
    }
  }
  bindPhonenumber(e:Event)
  {
    this.newPhoneNumber = (e.target as HTMLInputElement).value;
    //this.toastr.info("Phonenumber: "+this.newPhoneNumber);
    this.phonenumberDirtyStateCheck();
    this.isPhonenumberOk = (new RegExp('^(09)[0-9]{9}$')).test(this.newPhoneNumber);

  }
  phonenumberDirtyStateCheck()
  {
    if(this.newPhoneNumber.length>0)
    {
      this.phonenumberDirtyState = true;
    }
    else
    {
      this.phonenumberDirtyState = false;
    }
  }
  bindCurrentPassword(e:Event)
  {
    this.currentPassWord = (e.target as HTMLInputElement).value;
    //this.toastr.info("Current Passwor: "+ this.currentPassWord);
    this.currentPasswordDirtyStateCheck();
    this.compareWithCurrentPassword();
    this.newPasswordStyleSet();
  }

  currentPasswordDirtyStateCheck()
  {
    if(this.currentPassWord.length == 0)
    {
      this.currentPasswordDirtyState = false;
    }
    else
    {
      this.currentPasswordDirtyState = true;
    }
  }

  bindNewPassword(e:Event)
  {
    this.newPassWord = (e.target as HTMLInputElement).value;
    //this.toastr.info("New Password: "+ this.newPassWord);
    if(this.newPassWord.length>0)
    {
      this.newPasswordDirtyState = true;
    }
    if(this.newPassWord.length == 0)
    {
      this.newPasswordDirtyState = false;
    }

    this.newPasswordComplexityCheck();
    this.compareWithCurrentPassword();
    this.isNewPasswordOk = (this.newPasswordDirtyState && this.newPasswordHasDigit && this.newPasswordHasLowerCase && this.newPasswordHasUpperCase && this.newPasswordHasSpescialCharacter && this.newPasswordLenghtState && !this.isSimilarToOldPassword);
    this.newPasswordStyleSet();

  }
  submitEdit()
  {
    this.submitButtonIsPressed = true;
    this.http.post("https://localhost:44396/api/ApplicationUser/CheckMyPassword/"+this.currentPassWord,'').subscribe(
      (res:boolean)=>
      {
        this.isCurrentPassWordCorrect = res;
       // this.toastr.show("The PassWord State is: "+res);
        if(res === true)
        {
          var body;
          if(this.newPasswordDirtyState == true )
         {
              body=
             {
             Username : this.userDetails.fullname,
             Email : this.userDetails.email,
             Phonenumber : this.userDetails.phoneNumber,
             Password : this.newPassWord,
             Fullname :this.userDetails.fullname,
             SSN: this.userDetails.ssn
            }
        }
        else if(this.newPasswordDirtyState == false )
        {
           body={
            Username : this.userDetails.fullname,
            Email : this.userDetails.email,
            Phonenumber : this.userDetails.phoneNumber,
            Password : this.currentPassWord,
            Fullname :this.userDetails.fullname,
            SSN: this.userDetails.ssn
         }
        }
        if(this.gmailDirtyState === true)
        {
          body.Email = this.newGmail;
        }
        if(this.phonenumberDirtyState === true)
        {
          body.Phonenumber= this.newPhoneNumber;
        }
        this.http.put("https://localhost:44396/api/ApplicationUser/EditUserProfile", body).subscribe(
         (res:any)=>
          {
            this.toastr.success("Your profile was updatated successfully");
          }
        )
     console.log(body);
     this.userProfileService.getUserProfile().subscribe(
      (res:any)=>
      {
        this.userDetails = res;
      }
    );

    localStorage.removeItem("token");
    this.router.navigate(['/user/login']);
    this.toastr.info("Please login again");


      }

      }
    )

  }
  newPasswordStyleSet()
  {
   const newPasswordField = document.getElementById("newPasswordField");
   const redColor = Color('#750505');
   const greenColor = Color('#1f7505b7');




  }

  validateGmail()
  {
     this.isNewGmailValid= EmailValidator.validate(this.newGmail);
  }



  compareWithCurrentPassword()
  {
    if(this.currentPassWord == null || this.newPassWord==null)
    {
     this.isSimilarToOldPassword = false;
    }
    else
    {
      if(this.currentPassWord == this.newPassWord)
      {
        this.isSimilarToOldPassword = true;
      }
      else{
        this.isSimilarToOldPassword = false;
      }
    }
    this.isNewPasswordOk = (this.newPasswordDirtyState && this.newPasswordHasDigit && this.newPasswordHasLowerCase && this.newPasswordHasUpperCase && this.newPasswordHasSpescialCharacter && this.newPasswordLenghtState && !this.isSimilarToOldPassword);
  }

  newPasswordLengthCheck()
  {
    if(this.newPassWord.length<8 || this.newPassWord.length >254)
      {
        this.newPasswordLenghtState = false;
      }
      else
      {
        this.newPasswordLenghtState = true;
      }

  }

  newPasswordComplexityCheck()
  {
    //Total Check
   //this.newPasswordComplexityState= (new RegExp('.*(?=^.{8,254}$)'+'(?=[^\\d]*\\d)'+'(?=[^A-Z]*[A-Z])'+'(?=[^a-z]*[a-z])'+'(?=[^\\W]*\\W)'+'.*')).test(this.newPassWord);
  // this.toastr.info("new Passw: "+this.newPassWord+"     "+"Complexity: "+this.newPasswordComplexityState+ "     ");


  //Section by Section Check
      //CheckNewPassword has digit or not
  this.newPasswordHasDigit = (new RegExp('.*(?=[^\\d]*\\d).*')).test(this.newPassWord);
      //Check NewPassword has special Character or not
  this.newPasswordHasSpescialCharacter = (new RegExp('.*(?=[^\\W]*\\W).*')).test(this.newPassWord);
      //Check NewPassword has lowercase letter or not
  this.newPasswordHasLowerCase = (new RegExp('.*(?=[^a-z]*[a-z]).*')).test(this.newPassWord);
      //Check NewPassword has uppercase letter ot not
  this.newPasswordHasUpperCase = (new RegExp('.*(?=[^A-Z]*[A-Z]).*')).test(this.newPassWord);
      //Check NewPassword has at least 8 characters or not
  this.newPasswordLenghtState = (new RegExp('.*(?=^.{8,254}$).*')).test(this.newPassWord);


  }








}
